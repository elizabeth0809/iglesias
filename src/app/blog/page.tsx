import { blogGetAllAction } from '@/insfractucture/actions/blogs/get-blogs.actions';
import { IBlogResponse } from '@/insfractucture/interfaces/blogs/blog.interfaces';
import { EntradasBlogsComponent } from './components/BlogEspiritual';
import { blogGetAllGraphQLAction } from '@/insfractucture/actions/blogs/graphql/get-blogs-actions';

// Función para obtener blogs desde REST API (la que ya tenías)
async function getBlogsREST(page: number = 1): Promise<{ blogs: IBlogResponse[]; error?: string }> {
  try {
    const blogs = await blogGetAllAction({ page });
    return { blogs };
  } catch (error) {
    console.error('Error fetching blogs from REST:', error);
    return {
      blogs: [],
      error: 'Error al cargar los blogs desde REST API'
    };
  }
}

// Nueva función para obtener blogs desde GraphQL con mapper
async function getBlogsGraphQL(page: number = 1): Promise<{ blogs: IBlogResponse[]; pagination?: any; error?: string }> {
  try {
    const response = await blogGetAllGraphQLAction({ page, pageSize: 10 });
    
    // Mostrar la respuesta en consola para pruebas
    console.log('🔥 Respuesta completa de GraphQL:', JSON.stringify(response, null, 2));
    console.log('📝 Blogs mapeados:', response.blogs);
    console.log('📊 Paginación:', response.pagination);
    
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
  searchParams: Promise<{ page?: string; source?: string }>; // Agregamos 'source' para elegir la API
}

export default async function BlogsPage({ searchParams }: BlogsPageProps) {
  const resolvedSearchParams = await searchParams;
  const page = Number(resolvedSearchParams.page) || 1;
  const source = resolvedSearchParams.source || 'graphql'; // Por defecto usar GraphQL
  
  // Decidir qué función usar basado en el parámetro 'source'
  let result;
  
  if (source === 'rest') {
    console.log('🔄 Usando REST API...');
    result = await getBlogsREST(page);
  } else {
    console.log('🔄 Usando GraphQL API...');
    result = await getBlogsGraphQL(page);
  }
  
  const { blogs, error } = result;
  
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-600">{error}</p>
          <div className="mt-4">
            <p className="text-sm text-gray-500">
              Fuente actual: {source === 'rest' ? 'REST API' : 'GraphQL API'}
            </p>
            <div className="mt-2 space-x-2">
              <a 
                href="?source=graphql" 
                className="text-blue-600 hover:underline"
              >
                Probar GraphQL
              </a>
              <span>|</span>
              <a 
                href="?source=rest" 
                className="text-blue-600 hover:underline"
              >
                Probar REST
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div suppressHydrationWarning={true}>
      {/* Indicador de fuente de datos para desarrollo */}
      <div className="bg-gray-100 p-2 text-center text-sm text-gray-600 mb-4">
        📡 Datos obtenidos desde: <strong>{source === 'rest' ? 'REST API' : 'GraphQL API'}</strong>
        <div className="mt-1 space-x-2">
          <a 
            href="?source=graphql" 
            className="text-blue-600 hover:underline"
          >
            GraphQL
          </a>
          <span>|</span>
          <a 
            href="?source=rest" 
            className="text-blue-600 hover:underline"
          >
            REST
          </a>
        </div>
        <p className="text-xs mt-1">
          Total de blogs: {blogs.length}
        </p>
      </div>
      
      <EntradasBlogsComponent blogs={blogs} />
    </div>
  );
}

export const metadata = {
  title: 'Blog Espiritual',
  description: 'Últimas entradas de nuestro blog espiritual',
};