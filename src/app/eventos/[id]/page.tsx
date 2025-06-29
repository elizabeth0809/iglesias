// app/eventos/[id]/page.tsx

import { eventGetByIdAction } from '@/insfractucture/actions/eventos/get-event-for-id.actions';
import { IEventoResponse } from '@/insfractucture/interfaces/eventos/eventos.interfaces';
import { notFound } from 'next/navigation';
import { EventoDetailComponent } from '../components/evento-details.components';

// Esta función se ejecuta en el servidor
async function getEvento(id: string): Promise<{ evento: IEventoResponse | null; error?: string }> {
  try {
    const evento = await eventGetByIdAction(id);
    return { evento };
  } catch (error) {
    console.error('Error fetching evento:', error);
    return {
      evento: null,
      error: 'Error al cargar el evento'
    };
  }
}

interface EventoPageProps {
  params: Promise<{ id: string }>;
}

export default async function EventoPage({ params }: EventoPageProps) {
  const resolvedParams = await params;
  const { evento, error } = await getEvento(resolvedParams.id);

  if (error || !evento) {
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
  const { evento } = await getEvento(resolvedParams.id);

  if (!evento) {
    return {
      title: 'Evento no encontrado',
      description: 'El evento que buscas no está disponible.',
    };
  }

  return {
    title: evento.nome,
    description: evento.descricao,
    openGraph: {
      title: evento.nome,
      description: evento.descricao,
      images: [
        {
          url: evento.imagem,
          width: 1200,
          height: 630,
          alt: evento.nome,
        },
      ],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: evento.nome,
      description: evento.descricao,
      images: [evento.imagem],
    },
  };
}