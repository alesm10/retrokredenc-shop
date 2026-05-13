import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: Request) {
  const { name, email, message, product } = await request.json()

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Chybí povinná pole' }, { status: 400 })
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
    subject: product
      ? `Zájem o produkt č. ${product} – ${name}`
      : `Nová zpráva od ${name}`,
    text: `Jméno: ${name}\nEmail: ${email}\n${product ? `Produkt: ${product}\n` : ''}Zpráva:\n${message}`,
  })

  return NextResponse.json({ ok: true })
}
