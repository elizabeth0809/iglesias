// src/app/blog/page.tsx
import { blogGetAllAction } from '@/insfractucture/actions/blogs/get-blogs.actions';
import { IBlogResponse } from '@/insfractucture/interfaces/blogs/blog.interfaces';
import { EntradasBlogsComponent } from './components/BlogEspiritual';

// Esta función se ejecuta en el servidor
async function getBlogs(page: number = 1): Promise<{ blogs: IBlogResponse[]; error?: string }> {
  try {
    const blogs = await blogGetAllAction({ page });
    return { blogs };
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return { 
      blogs: [], 
      error: 'Error al cargar los blogs' 
    };
  }
}

interface BlogsPageProps {
  searchParams: { page?: string };
}

export default async function BlogsPage({ searchParams }: BlogsPageProps) {
  const page = Number(searchParams.page) || 1;
  const { blogs, error } = await getBlogs(page);

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
      <EntradasBlogsComponent blogs={blogs} />
    </div>
  );
}

export const metadata = {
  title: 'Blog Espiritual',
  description: 'Últimas entradas de nuestro blog espiritual',
};