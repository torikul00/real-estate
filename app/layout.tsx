import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import BackToTop from "@/components/back-to-top"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Makaan - Find Your Perfect Home",
  description: "Find the perfect property for you and your family",
    generator: 'timu'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
          {children}
          <BackToTop />
      </body>
    </html>
  )
}
