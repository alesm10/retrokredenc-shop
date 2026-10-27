import { MetadataRoute } from 'next'
import { getProducts } from '@/lib/produkty'

export const revalidate = 3600

// ⚠ Datum v mapě webu musí říkat, kdy se stránka OPRAVDU změnila.
// Do 27. 10. 2026 tu stálo `new Date()`, takže titulní strana, katalog,
// O nás i Kontakt hlásily „změněno právě teď" při každém přegenerování
// (jednou za hodinu). Google na nespolehlivé datum reaguje tak, že ho
// přestane brát v potaz u celého webu — a nové zboží se pak zařazuje pomaleji.
const STRANKY_BEZ_ZMEN = new Date('2026-09-18T00:00:00Z') // naposledy upraveny

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://retrokredenc.cz'
  const products = await getProducts()

  // Produkt se mění i po vystavení (přepsaný popis, jiné fotky) — platí
  // datum úpravy, ne vzniku. Starší záznamy mají `updated_at` dorovnané
  // na `created_at` migrací z 27. 10. 2026.
  const zmenaProduktu = (p: { updated_at?: string; created_at: string }) =>
    new Date(p.updated_at || p.created_at)

  const productUrls = products.map((product) => ({
    url: `${baseUrl}/produkty/${product.product_number}`,
    lastModified: zmenaProduktu(product),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // Titulní strana i katalog vypisují zboží, takže se mění s ním
  const posledniZmena = products.length
    ? new Date(Math.max(...products.map((p) => zmenaProduktu(p).getTime())))
    : STRANKY_BEZ_ZMEN

  return [
    {
      url: baseUrl,
      lastModified: posledniZmena,
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/produkty`,
      lastModified: posledniZmena,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/o-nas`,
      lastModified: STRANKY_BEZ_ZMEN,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/kontakt`,
      lastModified: STRANKY_BEZ_ZMEN,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    ...productUrls,
  ]
}
