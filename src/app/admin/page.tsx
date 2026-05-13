'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

const ADMIN_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

type Product = {
  id: string
  name: string
  description: string
  price: number
  category: string
  year: string
  available: boolean
  product_images: { url: string; is_primary: boolean }[]
}

const adminKey = typeof window !== 'undefined'
  ? localStorage.getItem('adminKey') || ''
  : ''

export default function AdminPage() {
  const [key, setKey] = useState('')
  const [authenticated, setAuthenticated] = useState(false)
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [form, setForm] = useState({
    name: '', description: '', price: '', category: 'hrnky', year: '', available: true
  })
  const [images, setImages] = useState<File[]>([])
  const [imagePreviews, setImagePreviews] = useState<string[]>([])
  const [message, setMessage] = useState('')

  useEffect(() => {
    const saved = localStorage.getItem('adminKey')
    if (saved) { setKey(saved); setAuthenticated(true); loadProducts(saved) }
  }, [])

  async function loadProducts(adminKey: string) {
    const res = await fetch('/api/products')
    if (res.ok) setProducts(await res.json())
  }

  function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    localStorage.setItem('adminKey', key)
    setAuthenticated(true)
    loadProducts(key)
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || [])
    setImages(files)
    setImagePreviews(files.map(f => URL.createObjectURL(f)))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setUploading(true)
    setMessage('')

    try {
      const uploadedUrls: string[] = []
      for (const file of images) {
        const fd = new FormData()
        fd.append('file', file)
        const res = await fetch('/api/upload', {
          method: 'POST',
          headers: { 'x-admin-key': key },
          body: fd,
        })
        if (!res.ok) throw new Error('Chyba při nahrávání fotky')
        const data = await res.json()
        uploadedUrls.push(data.url)
      }

      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-key': key },
        body: JSON.stringify({
          name: form.name,
          description: form.description,
          price: parseInt(form.price),
          category: form.category,
          year: form.year,
          available: form.available,
          images: uploadedUrls,
        }),
      })

      if (!res.ok) throw new Error('Chyba při ukládání produktu')

      setMessage('✓ Produkt byl přidán!')
      setForm({ name: '', description: '', price: '', category: 'hrnky', year: '', available: true })
      setImages([])
      setImagePreviews([])
      loadProducts(key)
    } catch (err: any) {
      setMessage('✗ ' + err.message)
    } finally {
      setUploading(false)
    }
  }

  async function handleDelete(id: string, name: string) {
    if (!confirm(`Opravdu smazat "${name}"?`)) return
    await fetch('/api/products', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', 'x-admin-key': key },
      body: JSON.stringify({ id }),
    })
    loadProducts(key)
  }

  async function toggleAvailable(product: Product) {
    await fetch(`/api/products/${product.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', 'x-admin-key': key },
      body: JSON.stringify({ available: !product.available }),
    })
    loadProducts(key)
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
          <button type="submit" className="btn-primary w-full">Přihlásit se</button>
        </form>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b px-4 py-4 flex justify-between items-center">
        <h1 className="text-xl font-serif">Admin panel — Retro Kredenc</h1>
        <button onClick={() => { localStorage.removeItem('adminKey'); setAuthenticated(false) }}
          className="text-sm text-gray-500 hover:text-gray-800">Odhlásit</button>
      </div>

      <div className="max-w-4xl mx-auto p-4 space-y-8">

        {/* Formulář pro přidání produktu */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-serif mb-6">Přidat nový produkt</h2>
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
              <input type="file" multiple accept="image/*"
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
              {uploading ? 'Nahrávám...' : 'Přidat produkt'}
            </button>
          </form>
        </div>

        {/* Seznam produktů */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-serif mb-6">Produkty ({products.length})</h2>
          <div className="space-y-3">
            {products.map(product => (
              <div key={product.id} className="flex items-center gap-4 p-3 border rounded-lg">
                {product.product_images?.[0] && (
                  <img src={product.product_images[0].url} alt=""
                    className="w-16 h-16 object-cover rounded-lg flex-shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate">{product.name}</div>
                  <div className="text-sm text-gray-500">{product.price} Kč · {product.category}</div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className={`text-xs px-2 py-1 rounded-full ${product.available ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                    {product.available ? 'Dostupné' : 'Nedostupné'}
                  </span>
                  <button onClick={() => handleDelete(product.id, product.name)}
                    className="text-red-500 hover:text-red-700 text-sm px-2 py-1">
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
