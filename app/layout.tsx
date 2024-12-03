import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({subsets: ['latin', 'cyrillic']})

export const metadata: Metadata = {
  title: 'User Card App',
  description: 'Display user cards and send emails',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}

