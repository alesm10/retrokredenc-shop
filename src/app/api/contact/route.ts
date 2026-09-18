import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { getProductName } from '@/lib/produkty'

export async function POST(request: Request) {
  const { name, email, message, product, web } = await request.json()

  // Past na roboty: pole „web“ je pro člověka skryté, vyplní ho jen robot.
  // Tváříme se, že zpráva odešla, ať robot nezkouší znovu.
  if (web) return NextResponse.json({ ok: true })

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Chybí povinná pole' }, { status: 400 })
  }

  try {
    let productInfo = ''
    if (product && /^\d+$/.test(String(product))) {
      const data = await getProductName(parseInt(product))
      productInfo = data ? `č. ${data.product_number} – ${data.name}` : `č. ${product}`
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    })

    await transporter.sendMail({
      from: `"Retro Kredenc web" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      replyTo: email,
      subject: productInfo
        ? `Zájem o produkt ${productInfo} – ${name}`
        : `Nová zpráva od ${name}`,
      text: `Jméno: ${name}\nEmail: ${email}\n${productInfo ? `Produkt: ${productInfo}\n` : ''}Zpráva:\n${message}`,
    })

    return NextResponse.json({ ok: true })
  } catch (e: any) {
    console.error('Kontaktní formulář:', e.message)
    return NextResponse.json({ error: 'Zprávu se nepodařilo odeslat' }, { status: 500 })
  }
}
