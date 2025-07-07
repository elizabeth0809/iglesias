// app/eventos/page.tsx
import { IEventoResponse } from "@/insfractucture/interfaces/eventos/eventos.interfaces";

import { EventosListComponent } from "./components/evento-list.components";
import { eventoGetAllGraphQLAction } from "@/insfractucture/actions/eventos/graphql/get-eventos.actions";
import { PaginationMeta } from "@/insfractucture/interfaces/blogs/blog.interfaces";

// Función para obtener eventos desde GraphQL
async function getEventosGraphQL(page: number = 1): Promise<{ 
  eventos: IEventoResponse[]; 
  pagination?: PaginationMeta; 
  error?: string 
}> {
  try {
    const response = await eventoGetAllGraphQLAction({ page, pageSize: 10 });
    
    console.log('🔥 Respuesta completa de GraphQL Eventos:', JSON.stringify(response, null, 2));
    console.log('📝 Eventos mapeados:', response.eventos);
    console.log('📊 Paginación:', response.pagination);
    
    return { 
      eventos: response.eventos,
      pagination: response.pagination
    };
  } catch (error) {
    console.error('Error fetching eventos from GraphQL:', error);
    return {
      eventos: [],
      error: 'Error al cargar los eventos desde GraphQL'
    };
  }
}

interface EventosPageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function EventosPage({ searchParams }: EventosPageProps) {
  const resolvedSearchParams = await searchParams;
  const page = Number(resolvedSearchParams.page) || 1;
  
  console.log('🔄 Usando GraphQL API para Eventos...');
  const { eventos, pagination, error } = await getEventosGraphQL(page);
  
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-600">{error}</p>
          <div className="mt-4">
            <p className="text-sm text-gray-500">
              No fue posible cargar los eventos desde GraphQL
            </p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Intentar nuevamente
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div suppressHydrationWarning={true}>
      {/* Información de la fuente de datos */}
      <div className="bg-green-50 border border-green-200 p-3 text-center text-sm text-green-700 mb-4 rounded-lg">
        <div className="flex items-center justify-center gap-2">
          <span>🚀</span>
          <strong>Dados obtidos desde GraphQL</strong>
        </div>
        <div className="mt-1 text-xs">
          Página: {page} | Total de eventos: {eventos.length}
          {pagination && (
            <span> | Total disponível: {pagination.total}</span>
          )}
        </div>
      </div>
      
      <EventosListComponent eventos={eventos} />
    </div>
  );
}

export const metadata = {
  title: 'Eventos Espirituais',
  description: 'Próximos eventos e encontros espirituais da nossa comunidade',
};