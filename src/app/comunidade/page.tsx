// @/app/comunidades/page.tsx

import { IComunidadeResponse } from '@/insfractucture/interfaces/comunidade/comunidades.interfaces';
import { NossaComunidadesComponent } from './components/NossaComunidadesComponent';
import { comunidadesGetAllGraphQLAction } from '@/insfractucture/actions/comunidade/comundade.actions';

// Definir PaginationMeta aquí para evitar conflictos
interface PaginationMeta {
  total: number;
  page: number;
  pageSize: number;
  pageCount: number;
}

async function getComunidadesGraphQL(page: number = 1): Promise<{
  comunidades: IComunidadeResponse[];
  pagination?: PaginationMeta;
  error?: string
}> {
  try {
    const response = await comunidadesGetAllGraphQLAction({ page, pageSize: 10 });
            
    return {
      comunidades: response.comunidades,
      pagination: response.pagination
    };
  } catch (error) {
    console.error('Error fetching comunidades from GraphQL:', error);
    return {
      comunidades: [],
      error: 'Error al cargar las comunidades desde GraphQL'
    };
  }
}

interface ComunidadesPageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function ComunidadesPage({ searchParams }: ComunidadesPageProps) {
  const resolvedSearchParams = await searchParams;
  const page = Number(resolvedSearchParams.page) || 1;
    
  console.log('🔄 Usando GraphQL API para Comunidades...');
  const { comunidades, error } = await getComunidadesGraphQL(page);
    
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-church-sky-50 via-white to-church-blue-50 flex items-center justify-center">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-church-red-200 text-center">
            <div className="w-16 h-16 bg-church-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-church-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.664-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-church-red-600 mb-4">Ops! Algo deu errado</h2>
            <p className="text-church-blue-700 mb-6">{error}</p>
            <div className="space-y-4">
              <p className="text-sm text-church-blue-600">
                Não foi possível carregar as comunidades no momento
              </p>
              <div className="w-full px-6 py-3 bg-church-blue-500 hover:bg-church-blue-600 text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg cursor-pointer">
                Tentar Novamente
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div suppressHydrationWarning={true}>
      <NossaComunidadesComponent comunidades={comunidades} />
    </div>
  );
}

export const metadata = {
  title: 'Nossa Comunidade - Igreja Batista Renovada Sonho de Deus',
  description: 'Conheça os diferentes grupos e ministérios que fazem parte da nossa família espiritual.',
  keywords: 'comunidade cristã, ministérios, grupos, igreja batista, família espiritual, comunhão',
  openGraph: {
    title: 'Nossa Comunidade - Igreja Batista Renovada Sonho de Deus',
    description: 'Conheça os diferentes grupos e ministérios que fazem parte da nossa família espiritual.',
    type: 'website',
  },
};