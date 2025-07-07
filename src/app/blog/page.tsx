// app/blog/page.tsx
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
  const { blogs,  error } = await getBlogsGraphQL(page);
  
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-600">{error}</p>
          <div className="mt-4">
            <p className="text-sm text-gray-500">
              No fue posible cargar los blogs desde GraphQL
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
      <EntradasBlogsComponent blogs={blogs} />
    </div>
  );
}

export const metadata = {
  title: 'Blog Espiritual',
  description: 'Últimas entradas de nuestro blog espiritual',
};