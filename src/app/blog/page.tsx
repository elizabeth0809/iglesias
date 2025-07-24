import { IBlogResponse, PaginationMeta } from '@/insfractucture/interfaces/blogs/blog.interfaces';
import { EntradasBlogsComponent } from './components/BlogEspiritual';
import { blogGetAllGraphQLAction } from '@/insfractucture/actions/blogs/graphql/get-blogs-actions';

async function getBlogsGraphQL(page: number = 1): Promise<{
  blogs: IBlogResponse[];
  pagination?: PaginationMeta;
  error?: string
}> {
  try {
    const response = await blogGetAllGraphQLAction({ page, pageSize: 10 });
        
    return {
      blogs: response.blogs,
      pagination: response.pagination
    };
  } catch (error) {
    console.error('Error fetching blogs from GraphQL:', error);
    return {
      blogs: [],
      error: 'Error al cargar los blogs desde GraphQL'
    };
  }
}

interface BlogsPageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function BlogsPage({ searchParams }: BlogsPageProps) {
  const resolvedSearchParams = await searchParams;
  const page = Number(resolvedSearchParams.page) || 1;
  
  console.log('🔄 Usando GraphQL API para Blogs...');
  const { blogs, error } = await getBlogsGraphQL(page);
  
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
                Não foi possível carregar os blogs no momento
              </p>
              <button
                onClick={() => window.location.reload()}
                className="w-full px-6 py-3 bg-church-blue-500 hover:bg-church-blue-600 text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
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
      <EntradasBlogsComponent blogs={blogs} />
    </div>
  );
}

export const metadata = {
  title: 'Blog Espiritual - Igreja Batista Renovada Sonho de Deus',
  description: 'Reflexões, estudos bíblicos e inspirações para fortalecer sua fé e crescimento espiritual.',
  keywords: 'blog espiritual, estudos bíblicos, reflexões cristãs, igreja batista, fé, crescimento espiritual',
  openGraph: {
    title: 'Blog Espiritual - Igreja Batista Renovada Sonho de Deus',
    description: 'Reflexões, estudos bíblicos e inspirações para fortalecer sua fé e crescimento espiritual.',
    type: 'website',
  },
};