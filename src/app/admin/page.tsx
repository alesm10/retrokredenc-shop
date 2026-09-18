'use client'

import { useState, useEffect } from 'react'

type Product = {
  id: string
  name: string
  description: string
  price: number
  category: string
  year: string
  available: boolean
  product_number: number
  product_images: { url: string; is_primary: boolean }[]
}

const MAX_STRANA = 1600
const KVALITA = 0.82
const PRAZDNY_FORMULAR = { name: '', description: '', price: '', category: 'hrnky', year: '', available: true }

// Fotka z mobilu má 3–5 MB, server pustí jen 1 MB — zmenšíme ji v prohlížeči.
// Když se zmenšení nepovede, pošle se originál.
async function zmensiFotku(file: Blob & { name?: string }, maxStrana = MAX_STRANA, vzdyJpeg = false): Promise<File> {
  const nazev = file.name || 'fotka.jpg'
  const url = URL.createObjectURL(file)
  try {
    // onload místo img.decode() — decode ve skryté záložce čeká donekonečna
    const img = document.createElement('img')
    await new Promise<void>((hotovo, chyba) => {
      img.onload = () => hotovo()
      img.onerror = () => chyba(new Error('Fotku nejde načíst'))
      img.src = url
    })
    const pomer = Math.min(1, maxStrana / Math.max(img.naturalWidth, img.naturalHeight))
    if (!vzdyJpeg && pomer === 1 && file.size < 1_000_000 && file instanceof File) return file

    const canvas = document.createElement('canvas')
    canvas.width = Math.round(img.naturalWidth * pomer)
    canvas.height = Math.round(img.naturalHeight * pomer)
    const ctx = canvas.getContext('2d')!
    ctx.fillStyle = '#fff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

    const blob = await new Promise<Blob | null>(r => canvas.toBlob(r, 'image/jpeg', KVALITA))
    if (!blob) throw new Error('zmenšení se nepovedlo')
    return new File([blob], nazev.replace(/\.[^.]+$/, '') + '.jpg', { type: 'image/jpeg' })
  } catch (e) {
    if (vzdyJpeg) throw e
    return file instanceof File ? file : new File([file], nazev)
  } finally {
    URL.revokeObjectURL(url)
  }
}

// Pro AI stačí menší fotky — rychlejší odeslání a nižší cena
async function fotkaProAI(zdroj: Blob): Promise<string> {
  const jpeg = await zmensiFotku(zdroj, 1024, true)
  const dataUrl = await new Promise<string>((hotovo, chyba) => {
    const cteni = new FileReader()
    cteni.onload = () => hotovo(cteni.result as string)
    cteni.onerror = () => chyba(cteni.error)
    cteni.readAsDataURL(jpeg)
  })
  return dataUrl.slice(dataUrl.indexOf(',') + 1)
}

type NavrhAI = { nazev: string; popis: string; kategorie: string; rok: string; overit: string }

export default function AdminPage() {
  const [key, setKey] = useState('')
  const [authenticated, setAuthenticated] = useState(false)
  const [loginError, setLoginError] = useState('')
  const [products, setProducts] = useState<Product[]>([])
  const [uploading, setUploading] = useState(false)
  const [form, setForm] = useState(PRAZDNY_FORMULAR)
  const [upravuje, setUpravuje] = useState<Product | null>(null)
  // Stávající fotky upravovaného produktu v pořadí, jak se uloží (první = hlavní)
  const [stavajici, setStavajici] = useState<string[]>([])
  const [images, setImages] = useState<File[]>([])
  const [imagePreviews, setImagePreviews] = useState<string[]>([])
  // Změna klíče vyrobí nové políčko pro fotky — jinak by ukazovalo staré soubory
  const [fotkyKlic, setFotkyKlic] = useState(0)
  const [message, setMessage] = useState('')
  const [navrhuje, setNavrhuje] = useState(false)
  const [overit, setOverit] = useState('')

  useEffect(() => {
    const saved = localStorage.getItem('adminKey')
    if (!saved) return
    // Uložené heslo může být staré (po výměně hesla) — ověřit, ne jen převzít
    fetch('/api/admin', { headers: { 'x-admin-key': saved } }).then(res => {
      if (res.ok) { setKey(saved); setAuthenticated(true); loadProducts() }
      else localStorage.removeItem('adminKey')
    })
  }, [])

  async function loadProducts() {
    const res = await fetch('/api/products')
    if (res.ok) setProducts(await res.json())
  }

  function odhlasit() {
    localStorage.removeItem('adminKey')
    setAuthenticated(false)
    setKey('')
  }

  // Server odmítl heslo → zpátky na přihlášení, ať se nezkouší dál
  function kontrolaOdpovedi(res: Response, chyba: string) {
    if (res.status === 401 || res.status === 429) { odhlasit(); throw new Error('Přihlaste se znovu') }
    if (!res.ok) throw new Error(chyba)
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoginError('')
    const res = await fetch('/api/admin', { headers: { 'x-admin-key': key } })
    if (res.status === 429) { setLoginError('Příliš mnoho pokusů. Zkus to za 15 minut.'); return }
    if (!res.ok) { setLoginError('Špatné heslo, zkus to znovu.'); return }
    localStorage.setItem('adminKey', key)
    setAuthenticated(true)
    loadProducts()
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || [])
    setImages(files)
    setImagePreviews(files.map(f => URL.createObjectURL(f)))
  }

  function vycistitFormular() {
    setForm(PRAZDNY_FORMULAR)
    setUpravuje(null)
    setStavajici([])
    setImages([])
    setImagePreviews([])
    setFotkyKlic(k => k + 1)
    setOverit('')
  }

  async function navrhnoutPopis() {
    setNavrhuje(true)
    setMessage('')
    setOverit('')
    try {
      // Nové fotky mají přednost; u uloženého produktu se vezmou ty stávající
      const zdroje: Blob[] = images.length > 0
        ? images
        : await Promise.all(stavajici.map(async url => (await fetch(url)).blob()))
      if (zdroje.length === 0) throw new Error('Nejdřív vyberte fotky')
      const fotky = await Promise.all(zdroje.slice(0, 4).map(fotkaProAI))
      const poznamka = [form.name, form.description].filter(Boolean).join('\n')

      const res = await fetch('/api/popis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-key': key },
        body: JSON.stringify({ fotky, poznamka }),
      })
      if (res.status === 401 || res.status === 429) { odhlasit(); throw new Error('Přihlaste se znovu') }
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Návrh se nepovedl')

      const navrh = data as NavrhAI
      setForm(f => ({
        ...f,
        name: navrh.nazev,
        description: navrh.popis,
        category: navrh.kategorie || f.category,
        year: navrh.rok || f.year,
      }))
      setOverit(navrh.overit)
    } catch (err: any) {
      setMessage('✗ ' + err.message)
    } finally {
      setNavrhuje(false)
    }
  }

  function posunFotku(i: number, smer: -1 | 1) {
    const j = i + smer
    if (j < 0 || j >= stavajici.length) return
    const nove = [...stavajici]
    ;[nove[i], nove[j]] = [nove[j], nove[i]]
    setStavajici(nove)
  }

  function odeberFotku(i: number) {
    setStavajici(stavajici.filter((_, k) => k !== i))
  }

  function zacitUpravu(product: Product) {
    vycistitFormular()
    setUpravuje(product)
    setStavajici(product.product_images.map(i => i.url))
    setForm({
      name: product.name,
      description: product.description || '',
      price: String(product.price),
      category: product.category || 'hrnky',
      year: product.year || '',
      available: product.available,
    })
    setMessage('')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setUploading(true)
    setMessage('')

    try {
      const uploadedUrls: string[] = []
      for (const file of images) {
        const fd = new FormData()
        fd.append('file', await zmensiFotku(file))
        const res = await fetch('/api/upload', {
          method: 'POST',
          headers: { 'x-admin-key': key },
          body: fd,
        })
        kontrolaOdpovedi(res, res.status === 413
          ? `Fotka ${file.name} je moc velká`
          : `Chyba při nahrávání fotky ${file.name}`)
        const data = await res.json()
        uploadedUrls.push(data.url)
      }

      const udaje = {
        name: form.name,
        description: form.description,
        price: parseInt(form.price),
        category: form.category,
        year: form.year,
        available: form.available,
        images: uploadedUrls,
        ...(upravuje ? { fotky: stavajici } : {}),
      }
      const res = upravuje
        ? await fetch(`/api/products/${upravuje.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json', 'x-admin-key': key },
            body: JSON.stringify(udaje),
          })
        : await fetch('/api/products', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'x-admin-key': key },
            body: JSON.stringify(udaje),
          })
      kontrolaOdpovedi(res, 'Chyba při ukládání produktu')

      setMessage(upravuje ? '✓ Změny uloženy!' : '✓ Produkt byl přidán!')
      vycistitFormular()
      loadProducts()
    } catch (err: any) {
      setMessage('✗ ' + err.message)
    } finally {
      setUploading(false)
    }
  }

  async function handleDelete(id: string, name: string) {
    if (!confirm(`Opravdu smazat "${name}"? Smažou se i jeho fotky.`)) return
    try {
      const res = await fetch('/api/products', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', 'x-admin-key': key },
        body: JSON.stringify({ id }),
      })
      kontrolaOdpovedi(res, 'Produkt se nepodařilo smazat')
      if (upravuje?.id === id) vycistitFormular()
      loadProducts()
    } catch (err: any) {
      setMessage('✗ ' + err.message)
    }
  }

  async function toggleAvailable(product: Product) {
    try {
      const res = await fetch(`/api/products/${product.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'x-admin-key': key },
        body: JSON.stringify({ available: !product.available }),
      })
      kontrolaOdpovedi(res, 'Změna se nepodařila')
      loadProducts()
    } catch (err: any) {
      setMessage('✗ ' + err.message)
    }
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-xl shadow max-w-sm w-full space-y-4">
          <h1 className="text-2xl font-serif text-center">Admin panel</h1>
          <p className="text-gray-500 text-sm text-center">Retro Kredenc</p>
          <input
            type="password"
            placeholder="Heslo"
            value={key}
            onChange={e => setKey(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg"
          />
          {loginError && (
            <p className="text-red-600 text-sm text-center">{loginError}</p>
          )}
          <button type="submit" className="btn-primary w-full">Přihlásit se</button>
        </form>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b px-4 py-4 flex justify-between items-center">
        <h1 className="text-xl font-serif">Admin panel — Retro Kredenc</h1>
        <button onClick={odhlasit}
          className="text-sm text-gray-500 hover:text-gray-800">Odhlásit</button>
      </div>

      <div className="max-w-4xl mx-auto p-4 space-y-8">

        {/* Formulář pro přidání nebo úpravu produktu */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-serif mb-6">
            {upravuje ? `Úprava produktu č. ${upravuje.product_number}` : 'Přidat nový produkt'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Název *</label>
                <input type="text" required value={form.name}
                  onChange={e => setForm({...form, name: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Cena (Kč) *</label>
                <input type="number" required value={form.price}
                  onChange={e => setForm({...form, price: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Kategorie</label>
                <select value={form.category}
                  onChange={e => setForm({...form, category: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg">
                  <option value="hrnky">Hrnky</option>
                  <option value="talire">Talíře</option>
                  <option value="vazy">Vázy</option>
                  <option value="sady">Sady</option>
                  <option value="dekorace">Dekorace</option>
                  <option value="jine">Jiné</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Rok výroby</label>
                <input type="text" placeholder="např. 1970-1980" value={form.year}
                  onChange={e => setForm({...form, year: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Popis</label>
              <textarea rows={3} value={form.description}
                onChange={e => setForm({...form, description: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Fotky</label>
              {upravuje && (
                <div className="mb-3">
                  <p className="text-sm text-gray-500 mb-2">
                    {stavajici.length > 0
                      ? 'Stávající fotky — první je hlavní. Změny se uloží tlačítkem „Uložit změny".'
                      : 'Produkt nemá žádnou fotku.'}
                  </p>
                  <div className="flex gap-3 flex-wrap">
                    {stavajici.map((url, i) => (
                      <div key={url} className="w-24">
                        <div className="relative">
                          <img src={url} alt="" className="w-24 h-24 object-cover rounded-lg border" />
                          {i === 0 && (
                            <span className="absolute top-1 left-1 text-xs bg-white/90 px-1.5 rounded">hlavní</span>
                          )}
                        </div>
                        <div className="flex mt-1 gap-1">
                          <button type="button" onClick={() => posunFotku(i, -1)} disabled={i === 0}
                            aria-label="Posunout dopředu"
                            className="flex-1 h-9 border rounded-lg disabled:opacity-30">◀</button>
                          <button type="button" onClick={() => odeberFotku(i)}
                            aria-label="Odebrat fotku"
                            className="flex-1 h-9 border rounded-lg text-red-600">✕</button>
                          <button type="button" onClick={() => posunFotku(i, 1)} disabled={i === stavajici.length - 1}
                            aria-label="Posunout dozadu"
                            className="flex-1 h-9 border rounded-lg disabled:opacity-30">▶</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {upravuje && <p className="text-sm text-gray-500 mb-1">Přidat další fotky:</p>}
              <input key={fotkyKlic} type="file" multiple accept="image/*"
                onChange={handleImageChange}
                className="w-full px-3 py-2 border rounded-lg" />
              {imagePreviews.length > 0 && (
                <div className="flex gap-2 mt-2 flex-wrap">
                  {imagePreviews.map((src, i) => (
                    <img key={i} src={src} alt="" className="w-20 h-20 object-cover rounded-lg border" />
                  ))}
                </div>
              )}
            </div>

            {(images.length > 0 || stavajici.length > 0) && (
              <div>
                <button type="button" onClick={navrhnoutPopis} disabled={navrhuje || uploading}
                  className="w-full py-3 border-2 border-amber-600 text-amber-800 rounded-lg font-medium disabled:opacity-50">
                  {navrhuje ? 'AI prohlíží fotky… (až půl minuty)' : '✨ Navrhnout název a popis z fotek'}
                </button>
                <p className="text-xs text-gray-500 mt-1">
                  Vyfoťte i dno se značkou. Co napíšete do názvu a popisu, AI vezme jako poznámku.
                </p>
              </div>
            )}

            {overit && (
              <div className="px-4 py-3 rounded bg-amber-50 border border-amber-300 text-amber-900 text-sm">
                <strong>Návrh od AI — před uložením zkontrolujte.</strong> {overit}
              </div>
            )}

            <div className="flex items-center gap-2">
              <input type="checkbox" id="available" checked={form.available}
                onChange={e => setForm({...form, available: e.target.checked})}
                className="h-4 w-4" />
              <label htmlFor="available" className="text-sm">Dostupné k prodeji</label>
            </div>

            {message && (
              <div className={`px-4 py-3 rounded ${message.startsWith('✓') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {message}
              </div>
            )}

            <button type="submit" disabled={uploading}
              className="btn-primary w-full disabled:opacity-50">
              {uploading ? 'Ukládám...' : upravuje ? 'Uložit změny' : 'Přidat produkt'}
            </button>
            {upravuje && (
              <button type="button" onClick={vycistitFormular}
                className="w-full py-2 text-gray-600 hover:text-gray-900">
                Zrušit úpravu
              </button>
            )}
          </form>
        </div>

        {/* Seznam produktů */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-serif mb-6">Produkty ({products.length})</h2>
          <div className="space-y-3">
            {products.map(product => (
              <div key={product.id} className="p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  {product.product_images?.[0] && (
                    <img src={product.product_images[0].url} alt=""
                      className="w-16 h-16 object-cover rounded-lg flex-shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="font-medium">{product.name}</div>
                    <div className="text-sm text-gray-500">
                      č. {product.product_number} · {product.price} Kč · {product.category}
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2 mt-3">
                  <span className={`text-xs px-2 py-1 rounded-full ${product.available ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                    {product.available ? 'Dostupné' : 'Prodáno'}
                  </span>
                  <button onClick={() => toggleAvailable(product)}
                    className="text-sm px-3 py-1 border rounded-lg hover:bg-gray-50">
                    {product.available ? 'Označit jako prodané' : 'Vrátit do prodeje'}
                  </button>
                  <button onClick={() => zacitUpravu(product)}
                    className="text-sm px-3 py-1 border rounded-lg hover:bg-gray-50">
                    Upravit
                  </button>
                  <button onClick={() => handleDelete(product.id, product.name)}
                    className="text-sm px-3 py-1 text-red-600 hover:text-red-800 ml-auto">
                    Smazat
                  </button>
                </div>
              </div>
            ))}
            {products.length === 0 && (
              <p className="text-gray-400 text-center py-8">Zatím žádné produkty</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
