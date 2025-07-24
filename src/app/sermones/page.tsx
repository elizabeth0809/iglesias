// app/sermones/page.tsx
import { Metadata } from 'next';
import { SermonResponse } from '@/insfractucture/interfaces/sermones/sermones.interfaces';
import { SermonesListComponent } from './components/SermonesList';
import { PaginationMeta } from '@/insfractucture/interfaces/blogs/blog.interfaces';
import { sermonGetAllGraphQLAction } from '@/insfractucture/actions/sermones/graphql/get-all-sermones.actions';

// Função para obter sermões desde GraphQL
async function getSermones(page: number = 1): Promise<{
  sermones: SermonResponse[];
  pagination?: PaginationMeta;
  error?: string
}> {
  try {
    console.log('🔄 Obtendo sermões desde GraphQL...');
    const response = await sermonGetAllGraphQLAction({ page, pageSize: 10 });
        
    console.log('🔥 Resposta completa de GraphQL Sermões:', JSON.stringify(response, null, 2));
    console.log('📝 Sermões mapeados:', response.sermones);
    console.log('📊 Paginação:', response.pagination);
        
    return {
      sermones: response.sermones,
      pagination: response.pagination
    };
  } catch (error) {
    console.error('Erro ao buscar sermões desde GraphQL:', error);
    return {
      sermones: [],
      error: 'Erro ao carregar os sermões desde GraphQL'
    };
  }
}

interface SermonesPageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function SermonesPage({ searchParams }: SermonesPageProps) {
  const resolvedSearchParams = await searchParams;
  const page = Number(resolvedSearchParams.page) || 1;
  
  console.log('🔄 Usando GraphQL API para Sermões...');
  const { sermones, error } = await getSermones(page);

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-church-sky-50 via-white to-church-blue-50 flex items-center justify-center">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-church-red-200 text-center">
            <div className="w-16 h-16 bg-church-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-church-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-church-red-600 mb-4">Ops! Algo deu errado</h2>
            <p className="text-church-blue-700 mb-6">{error}</p>
            <div className="space-y-4">
              <p className="text-sm text-church-blue-600">
                Não foi possível carregar os sermões no momento
              </p>
              <button
                onClick={() => window.location.reload()}
                className="w-full px-6 py-3 bg-church-red-500 hover:bg-church-red-600 text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Tentar Novamente
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div suppressHydrationWarning={true}>
      <SermonesListComponent sermones={sermones} />
    </div>
  );
}

export const metadata: Metadata = {
  title: 'Sermões | Igreja Batista Renovada Sonho de Deus',
  description: 'Ouça nossos sermões e pregações espirituais. Encontre inspiração e ensinamentos bíblicos que transformam vidas.',
  keywords: 'sermões, pregações, igreja batista, bíblia, ensinamentos, espiritual, palavra de deus, crescimento espiritual, fé',
  authors: [{ name: 'Igreja Batista Renovada Sonho de Deus' }],
  openGraph: {
    title: 'Sermões | Igreja Batista Renovada Sonho de Deus',
    description: 'Ouça nossos sermões e pregações espirituais. Encontre inspiração e ensinamentos bíblicos que transformam vidas.',
    type: 'website',
    url: '/sermones',
    siteName: 'Igreja Batista Renovada Sonho de Deus'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sermões | Igreja Batista Renovada Sonho de Deus',
    description: 'Ouça nossos sermões e pregações espirituais.',
  },
  robots: {
    index: true,
    follow: true,
  },
};