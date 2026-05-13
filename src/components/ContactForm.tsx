'use client'

import { useState } from 'react'
import Link from 'next/link'

const FORMSPREE_ENDPOINT = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT || ''

export default function ContactForm({ productId }: { productId?: string }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    product: productId || '',
  })
  const [gdprConsent, setGdprConsent] = useState(false)
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')

    try {
      const response = await fetch(FORMSPREE_ENDPOINT || 'https://formspree.io/f/your-form-id', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setStatus('success')
        setFormData({ name: '', email: '', message: '', product: productId || '' })
      } else {
        setStatus('error')
      }
    } catch (error) {
      setStatus('error')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-2">
          Jméno *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-2">
          Email *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>

      {productId && (
        <div>
          <label htmlFor="product" className="block text-sm font-medium mb-2">
            Produkt
          </label>
          <input
            type="text"
            id="product"
            name="product"
            value={formData.product}
            readOnly
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
          />
        </div>
      )}

      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-2">
          Zpráva *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          value={formData.message}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>

      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          id="gdpr"
          required
          checked={gdprConsent}
          onChange={(e) => setGdprConsent(e.target.checked)}
          className="mt-1 h-4 w-4 cursor-pointer"
        />
        <label htmlFor="gdpr" className="text-sm text-gray-700">
          Souhlasím se zpracováním osobních údajů dle{' '}
          <Link href="/zasady-ochrany-osobnich-udaju" className="underline hover:text-primary" target="_blank">
            Zásad ochrany osobních údajů
          </Link>
          . Údaje budou použity výhradně pro odpověď na můj dotaz. *
        </label>
      </div>

      <button
        type="submit"
        disabled={status === 'sending' || !gdprConsent}
        className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'sending' ? 'Odesílám...' : 'Odeslat zprávu'}
      </button>

      {status === 'success' && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          Děkujeme! Vaše zpráva byla úspěšně odeslána.
        </div>
      )}

      {status === 'error' && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Omlouváme se, došlo k chybě. Zkuste to prosím znovu.
        </div>
      )}
    </form>
  )
}
