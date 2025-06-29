import { GetEventosAllAction } from "@/insfractucture/actions/eventos/get-eventos.actions";
import { IEventoResponse } from "@/insfractucture/interfaces/eventos/eventos.interfaces";
import { EventosListComponent } from "./components/evento-list.components";

// Esta función se ejecuta en el servidor
async function getEventos(page: number = 1): Promise<{ eventos: IEventoResponse[]; error?: string }> {
  try {
    const eventos = await GetEventosAllAction({ page });
    return { eventos };
  } catch (error) {
    console.error('Error fetching eventos:', error);
    return {
      eventos: [],
      error: 'Error al cargar los eventos'
    };
  }
}

interface EventosPageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function EventosPage({ searchParams }: EventosPageProps) {
  const resolvedSearchParams = await searchParams;
  const page = Number(resolvedSearchParams.page) || 1;
  const { eventos, error } = await getEventos(page);

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div suppressHydrationWarning={true}>
      <EventosListComponent eventos={eventos} />
    </div>
  );
}

export const metadata = {
  title: 'Eventos Espirituais',
  description: 'Próximos eventos e encontros espirituais da nossa comunidade',
};