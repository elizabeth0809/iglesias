// app/contato/page.tsx
import { FormularioComponent } from '@/components/sections/home/formulario';
import { Metadata } from 'next';

export default function ContactPage() {
  return (
    <div suppressHydrationWarning={true}>
      <FormularioComponent backgroundVariant="light" />
    </div>
  );
}

export const metadata: Metadata = {
  title: 'Contato | Igreja Batista Renovada Sonho de Deus',
  description: 'Entre em contato conosco. Estamos aqui para ouvir você, compartilhar suas dúvidas, pedidos de oração e como podemos ajudar em sua jornada espiritual.',
  keywords: 'contato, igreja batista, fale conosco, pedidos de oração, dúvidas, ajuda espiritual, comunicação, atendimento',
  authors: [{ name: 'Igreja Batista Renovada Sonho de Deus' }],
  openGraph: {
    title: 'Contato | Igreja Batista Renovada Sonho de Deus',
    description: 'Entre em contato conosco. Estamos aqui para ouvir você e caminhar junto em sua jornada espiritual.',
    type: 'website',
    url: '/contato',
    siteName: 'Igreja Batista Renovada Sonho de Deus',
    locale: 'pt_BR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contato | Igreja Batista Renovada Sonho de Deus',
    description: 'Entre em contato conosco. Estamos aqui para ouvir você.',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: '/contato',
  },
  other: {
    'contact:address': 'Rua Luis Gomes Pain, nº 300, Jardim Marek, Santo André - SP, CEP: 09111-580',
  },
};