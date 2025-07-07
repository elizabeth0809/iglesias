// app/eventos/[slug]/page.tsx

import { IEventoResponse } from '@/insfractucture/interfaces/eventos/eventos.interfaces';
import { notFound } from 'next/navigation';
import { EventoDetailComponent } from '../components/evento-details.components';
import { eventoGetBySlugGraphQLAction } from '@/insfractucture/actions/eventos/graphql/get-eventos-by-slugs.actions';

// Función para obtener evento por slug usando GraphQL
async function getEventoBySlug(slug: string): Promise<{ evento: IEventoResponse | null; error?: string }> {
  try {
    console.log('🔄 Obteniendo evento por slug desde GraphQL:', slug);
    const evento = await eventoGetBySlugGraphQLAction(slug);
    
    if (!evento) {
      console.log('❌ Evento no encontrado con slug:', slug);
      return { evento: null };
    }
    
    console.log('✅ Evento encontrado:', evento.nome);
    return { evento };
  } catch (error) {
    console.error('Error fetching evento from GraphQL:', error);
    return {
      evento: null,
      error: 'Error al cargar el evento desde GraphQL'
    };
  }
}

interface EventoPageProps {
  params: Promise<{ slug: string }>;
}

export default async function EventoPage({ params }: EventoPageProps) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  const { evento, error } = await getEventoBySlug(slug);

  // Si hay error o no se encuentra el evento, mostrar 404
  if (error || !evento) {
    console.log('❌ Evento no encontrado o error:', { slug, error });
    notFound();
  }

  return (
    <div suppressHydrationWarning={true}>
     

      <EventoDetailComponent evento={evento} />
    </div>
  );
}

// Generar metadata dinámicos para SEO
export async function generateMetadata({ params }: EventoPageProps) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  let evento: IEventoResponse | null = null;

  try {
    const result = await getEventoBySlug(slug);
    evento = result.evento;
  } catch (error) {
    console.error('Error generating metadata:', error);
  }

  if (!evento) {
    return {
      title: 'Evento não encontrado',
      description: 'O evento que você procura não está disponível.',
    };
  }

  // Limpiar descripción para metadata (remover markdown)
  const cleanDescription = evento.descricao 
    ? evento.descricao.replace(/[#*_~`]/g, '').substring(0, 160)
    : `Participe do evento ${evento.nome}`;

  return {
    title: evento.nome,
    description: cleanDescription,
    keywords: [
      'evento',
      'espiritual',
      evento.nome,
      evento.localizacao || '',
    ].filter(Boolean).join(', '),
    openGraph: {
      title: evento.nome,
      description: cleanDescription,
      images: evento.imagem ? [
        {
          url: evento.imagem,
          width: 1200,
          height: 630,
          alt: evento.nome,
        },
      ] : [],
      type: 'article',
      publishedTime: evento.created_at,
      modifiedTime: evento.updated_at,
    },
    twitter: {
      card: 'summary_large_image',
      title: evento.nome,
      description: cleanDescription,
      images: evento.imagem ? [evento.imagem] : [],
    },
    alternates: {
      canonical: `/eventos/${slug}`,
    },
  };
}