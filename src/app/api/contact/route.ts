import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { createAdminClient } from '@/lib/supabase-server'

export async function POST(request: Request) {
  const { name, email, message, product } = await request.json()

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Chybí povinná pole' }, { status: 400 })
  }

  let productInfo = ''
  if (product) {
    const supabase = createAdminClient()
    const { data } = await supabase
      .from('products')
      .select('name, product_number')
      .eq('product_number', product)
      .single()
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
}
