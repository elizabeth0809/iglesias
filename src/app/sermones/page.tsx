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
  const { sermones,  error } = await getSermones(page);

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Erro</h2>
          <p className="text-gray-600">{error}</p>
          <div className="mt-4">
            <p className="text-sm text-gray-500">
              Não foi possível carregar os sermões desde GraphQL
            </p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Tentar novamente
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div suppressHydrationWarning={true}>
     
      
      <SermonesListComponent sermones={sermones}  />
    </div>
  );
}

export const metadata: Metadata = {
  title: 'Sermões | Igreja Batista Renovada Sonho de Deus',
  description: 'Ouça nossos sermões e pregações espirituais. Encontre inspiração e ensinamentos bíblicos.',
  keywords: 'sermões, pregações, igreja, bíblia, ensinamentos, espiritual',
  openGraph: {
    title: 'Sermões | Igreja Batista Renovada Sonho de Deus',
    description: 'Ouça nossos sermões e pregações espirituais. Encontre inspiração e ensinamentos bíblicos.',
    type: 'website',
    url: '/sermones',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sermões | Igreja Batista Renovada Sonho de Deus',
    description: 'Ouça nossos sermões e pregações espirituais.',
  },
};