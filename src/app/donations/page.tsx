import { NossaDoacoesComponent } from "./components/NossaDoacoesComponent";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Doações - Igreja Batista Renovada Sonho de Deus',
  description: 'Contribua para a obra de Deus. Que cada um dê como propôs em seu coração, não de mala gana nem por obrigação, porque Deus ama ao dador alegre.',
  keywords: ['doações', 'contribuição', 'igreja batista', 'ofertas', 'dízimo', 'contribuir', 'pix', 'igreja renovada', 'sonho de deus'],
  
  // Open Graph para redes sociais (WhatsApp, Facebook, etc.)
  openGraph: {
    title: 'Doações - Igreja Batista Renovada Sonho de Deus',
    description: 'Contribua para a obra de Deus. Que cada um dê como propôs em seu coração, não de mala gana nem por obrigação, porque Deus ama ao dador alegre.',
    type: 'website',
    locale: 'pt_BR',
    url: 'https://www.ibrsonhodedeus.com.br/donations', // Tu dominio real
    siteName: 'Igreja Batista Renovada Sonho de Deus',
    images: [
      {
        url: 'https://www.ibrsonhodedeus.com.br/logo.jpg', // Solo usando el logo existente
        width: 400,
        height: 400,
        alt: 'Igreja Batista Renovada Sonho de Deus - Doações',
        type: 'image/jpeg',
      }
    ],
  },

  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: 'Doações - Igreja Batista Renovada Sonho de Deus',
    description: 'Contribua para a obra de Deus. Que cada um dê como propôs em seu coração.',
    images: ['https://www.ibrsonhodedeus.com.br/logo.jpg'],
    creator: '@seu_twitter', // Si tienen Twitter
  },

  // Metadatos adicionales
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },

  // Canonical URL
  alternates: {
    canonical: 'https://www.ibrsonhodedeus.com.br/donations',
  },

  // Otros metadatos útiles
  category: 'Religion',
  classification: 'Igreja',
  
  // Información adicional para aplicaciones
  appleWebApp: {
    capable: true,
    title: 'IBR Sonho de Deus - Doações',
    statusBarStyle: 'default',
  },

  // Verificación y autores
  authors: [
    {
      name: 'Igreja Batista Renovada Sonho de Deus',
      url: 'https://www.ibrsonhodedeus.com.br',
    }
  ],

  // Información de contacto/organización
  other: {
    'organization:name': 'Igreja Batista Renovada Sonho de Deus',
    'organization:type': 'Religious Organization',
    'geo:region': 'BR-SP',
    'geo:placename': 'Santo André, São Paulo',
  },
};

export default function DoacoesPage() {
  return (
    <div suppressHydrationWarning={true}>
      <NossaDoacoesComponent />
    </div>
  );
}