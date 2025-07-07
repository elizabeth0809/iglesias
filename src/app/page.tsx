import { FormularioComponent } from "@/components/sections/home/formulario";
import { VersiculoDelDia } from "@/components/sections/home/VersiculoDelDia";
import { TestimonioSection } from "@/components/sections/home/TestimonioSection";
import { Metadata } from "next";
import { EventosCarousel } from "@/components/sections/eventos/eventos.components";
import { SermonesCarousel } from "@/components/sections/sermones/sermones.components";
import { BlogsCarousel } from "@/components/sections/blog/blog-carousel.components";

// Importações GraphQL para blogs, eventos E sermões
import { blogGetAllGraphQLAction } from "@/insfractucture/actions/blogs/graphql/get-blogs-actions";
import { eventoGetAllGraphQLAction } from "@/insfractucture/actions/eventos/graphql/get-eventos.actions";

import { CarruselImagenComponents } from "@/components/sections/home/CarruselImagen";
import { LocationSectionComplete } from "@/components/sections/mapa/mapa-section";
import { sermonGetAllGraphQLAction } from "@/insfractucture/actions/sermones/graphql/get-all-sermones.actions";

async function getHomePageData() {
  try {
    const [blogsResult, eventosResult, sermonesResult] = await Promise.allSettled([
      blogGetAllGraphQLAction({ page: 1, pageSize: 6 }),
      eventoGetAllGraphQLAction({ page: 1, pageSize: 6 }),
      sermonGetAllGraphQLAction({ page: 1, pageSize: 6 }), 
    ]);

    // Processar resultado dos blogs
    const blogs = blogsResult.status === 'fulfilled' 
      ? blogsResult.value.blogs.slice(0, 6)
      : [];

    // Processar resultado dos eventos
    const eventos = eventosResult.status === 'fulfilled'
      ? eventosResult.value.eventos.slice(0, 6)
      : [];

    // 👈 ATUALIZADO: Processar resultado dos sermões com GraphQL
    const sermones = sermonesResult.status === 'fulfilled'
      ? sermonesResult.value.sermones.slice(0, 6)
      : [];


    return {
      blogs,
      eventos,
      sermones,
    };
  } catch (error) {
    console.error('❌ Erro ao buscar dados da página inicial:', error);
    return {
      blogs: [],
      eventos: [],
      sermones: [],
    };
  }
}

export default async function Home() {
  const { blogs, eventos, sermones } = await getHomePageData();

  return (
    <main className="min-h-screen bg-white">
    

      {/* Seção Hero */}
      <section className="relative h-[60vh] bg-gray-900 text-white flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/hero/hero-imagen.png')",
          }}
        ></div>
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="md:text-6xl font-bold mb-4 font-serif text-4xl text-white">
            Bem-vindo à Igreja Batista Renovada Sonho de Deus
          </h1>
          <p className="text-xl md:text-2xl mb-8 font-sans text-muted-foreground text-white">
            Um lugar de Fé, Esperança e Amor
          </p>      
        </div>
      </section>

      {/* Carrossel de Próximos Eventos */}
      <EventosCarousel eventos={eventos} />
      
      <CarruselImagenComponents />
      
      <TestimonioSection />
      
      
      
      <LocationSectionComplete />
      <BlogsCarousel blogs={blogs} />
      <VersiculoDelDia />
      <SermonesCarousel sermones={sermones} />
      <FormularioComponent />
    </main>
  );
}

export const metadata: Metadata = {
  // Título e Descrição Base
  title: 'Igreja Batista Renovada Sonho de Deus | Santo André - SP',
  description: 'Bem-vindo à Igreja Batista Renovada Sonho de Deus em Santo André. Um lugar de fé, esperança e amor onde você encontrará comunhão, crescimento espiritual e a presença de Deus. Participe dos nossos cultos, eventos e estudos bíblicos.',

  keywords: [
    'Igreja Batista Renovada',
    'Sonho de Deus',
    'Santo André',
    'Igreja evangélica',
    'Cultos',
    'Estudos bíblicos',
    'Comunidade cristã',
    'Fé',
    'Esperança',
    'Amor',
    'EBD',
    'Jardim Marek'
  ],

  // Informações do site
  applicationName: 'Igreja Batista Renovada Sonho de Deus',
  category: 'Religion',
  classification: 'Igreja Evangélica',

  // Configurações do autor/organização
  authors: [{ name: 'Igreja Batista Renovada Sonho de Deus' }],
  creator: 'Igreja Batista Renovada Sonho de Deus',
  publisher: 'Igreja Batista Renovada Sonho de Deus',

  // Localização e contato
  other: {
    'geo.region': 'BR-SP',
    'geo.placename': 'Santo André',
    'geo.position': '-23.6743587;-46.4922899',
    'ICBM': '-23.6743587, -46.4922899',
    'address': 'Rua Luis Gomes Pain, nº 300, Jardim Marek, Santo André - SP, 09111-580'
  },

  // Open Graph (Facebook, WhatsApp, etc.)
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    title: 'Igreja Batista Renovada Sonho de Deus | Santo André - SP',
    description: 'Um lugar de fé, esperança e amor em Santo André. Venha fazer parte da nossa comunidade cristã e crescer espiritualmente conosco.',
    url: 'https://seudominio.com.br', // Substitua pelo seu domínio real
    siteName: 'Igreja Batista Renovada Sonho de Deus',
    images: [
      {
        url: '/logo.jpg',
        width: 1200,
        height: 630,
        alt: 'Igreja Batista Renovada Sonho de Deus - Logo',
        type: 'image/jpeg',
      },
      {
        url: '/hero/hero-imagen.png',
        width: 1200,
        height: 630,
        alt: 'Igreja Batista Renovada Sonho de Deus - Bem-vindos',
        type: 'image/png',
      }
    ],
  },

  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: 'Igreja Batista Renovada Sonho de Deus',
    description: 'Um lugar de fé, esperança e amor em Santo André - SP. Venha nos conhecer!',
    images: ['/logo.jpg'],
    creator: '@ibr_sonhodedeus', // Se tiverem Twitter
  },

  // Ícones e manifestos
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/logo.jpg', sizes: '32x32', type: 'image/jpeg' },
    ],
    apple: [
      { url: '/logo.jpg', sizes: '180x180', type: 'image/jpeg' },
    ],
    shortcut: '/favicon.ico',
  },

  // Informações adicionais para PWA
  manifest: '/manifest.json', // Se você tiver um arquivo manifest

  // Configurações de robôs
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // Links alternativos
  alternates: {
    canonical: 'https://seudominio.com.br', // Substitua pelo seu domínio real
  },

  // Configurações de visualização
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },

  // Verificação de proprietário (Google, Bing, etc.)
  verification: {
    // google: 'seu-codigo-google-aqui',
    // bing: 'seu-codigo-bing-aqui',
  },
};