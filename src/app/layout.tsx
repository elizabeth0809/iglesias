import { Header } from "@/components/ui/header"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"

import type React from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Iglesia Web",
  description: "Bienvenido a nuestra comunidad de fe",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <Header />
        <div className="">{children}</div>
      </body>
    </html>
  )
}

