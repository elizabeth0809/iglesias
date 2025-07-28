import { MinimalHeader } from "@/components/ui/header";
import "./globals.css";
import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import type React from "react";
import { Footer } from "@/components/sections/footer/footer";
import QueryProvider from "@/providers/QueryProvider"; 
import { Toaster } from "sonner";
import { Matomo } from "@/analytics/Matomo";
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
  icons: {
    icon: [
      {
        url: "/favicon_io/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png"
      },
      {
        url: "/favicon_io/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png"
      },
      {
        url: "/favicon_io/favicon-16x16.png",
        sizes: "any"
      }
    ],
    apple: {
      url: "/favicon_io/android-chrome-192x192.png",
      sizes: "192x192",
      type: "image/png"
    },
    shortcut: "/favicon_io/favicon-16x16.png"
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${inter.variable} ${lora.variable}`}>
      <head>
        <link rel="icon" type="image/x-icon" href="/favicon_io/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon_io/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon_io/favicon-32x32.png" />
        <link rel="apple-touch-icon" sizes="192x192" href="/favicon_io/android-chrome-192x192.png" />
      </head>
      <body className="bg-background font-sans text-foreground">
        <QueryProvider>
          <MinimalHeader />
          {children}
          <Toaster  richColors={false} />
          <Footer />
           {process.env.NODE_ENV === 'production' && <Matomo />}
        </QueryProvider>
      </body>
    </html>
  );
}
