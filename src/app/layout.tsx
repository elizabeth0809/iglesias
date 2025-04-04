import { Header } from "@/components/ui/header"
import "./globals.css"
import type { Metadata } from "next"
import { Inter, Lora } from "next/font/google";

import type React from "react"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-serif",
  display: "swap",
});

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
  
     <html lang="es" className={`${inter.variable} ${lora.variable}`}>
     <body className="bg-background font-sans text-foreground">
     <Header />
      {children}</body>
   </html>
  )
}

