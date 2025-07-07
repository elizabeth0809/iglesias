import { Metadata } from 'next';
import Image from "next/image";
import Link from "next/link";
import { notFound } from 'next/navigation';
import { CalendarIcon, Clock, ArrowLeft } from "lucide-react";
import { IBlogResponse } from "@/insfractucture/interfaces/blogs/blog.interfaces";
import { blogGetBySlugGraphQLAction } from '@/insfractucture/actions/eventos/graphql/get-eventos-by-slugs.actions';


// Función para obtener blog por slug usando GraphQL
async function getBlogDetails(slug: string): Promise<{ blog: IBlogResponse | null; error?: string }> {
  try {
    console.log('🔄 Obteniendo blog por slug desde GraphQL:', slug);
    const blog = await blogGetBySlugGraphQLAction(slug);
    
    if (!blog) {
      console.log('❌ Blog no encontrado con slug:', slug);
      return { blog: null };
    }
    
    console.log('✅ Blog encontrado:', blog.title);
    return { blog };
  } catch (error) {
    console.error('Error fetching blog details from GraphQL:', error);
    return {
      blog: null,
      error: 'Error al cargar el blog desde GraphQL'
    };
  }
}

interface BlogDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  
  const { blog, error } = await getBlogDetails(slug);

  // Si hay error o no se encuentra el blog, mostrar 404
  if (error || !blog) {
    console.log('❌ Blog no encontrado o error:', { slug, error });
    notFound();
  }

  // Función para formatear la fecha
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("pt-BR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch (error) {
      console.error('Error formatting date:', error);
      return dateString;
    }
  };

  // Función para estimar tiempo de lectura
  const estimateReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return `${minutes} min de leitura`;
  };

  return (
    <div className="min-h-screen bg-gray-50" suppressHydrationWarning={true}>
   
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Botón de volver */}
        <div className="mb-6">
          <Link
            href="/blog"
            className="inline-flex items-center text-gray-600 hover:text-gray-800 font-medium transition-colors duration-200"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar ao blog
          </Link>
        </div>

        <article className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Imagen principal */}
          <div className="relative w-full h-[400px] overflow-hidden">
            <Image
              src={blog.image || "/placeholder.svg"}
              alt={blog.title}
              fill
              className="object-cover transition-transform duration-300 hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>

          <div className="p-6 md:p-8">
            {/* Título */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              {blog.title}
            </h1>

            {/* Metadatos */}
            <div className="flex flex-wrap items-center text-gray-500 mb-6 space-x-4">
              <div className="flex items-center">
                <CalendarIcon className="h-4 w-4 mr-2" />
                <span className="text-sm">{formatDate(blog.created_at)}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                <span className="text-sm">
                  {blog.content
                    ? estimateReadingTime(blog.content)
                    : "5 min de leitura"}
                </span>
              </div>
              {blog.category_id && (
                <div className="flex items-center">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                    {blog.category_id}
                  </span>
                </div>
              )}
            </div>

            {/* Contenido */}
            <div className="prose prose-lg max-w-none">
              {/* Descripción como extracto destacado */}
              {blog.description && (
                <div className="text-xl text-gray-700 font-medium mb-8 p-6 bg-gray-50 border-l-4 border-blue-500 rounded-r-lg italic">
                  &ldquo;{blog.description}&rdquo;
                </div>
              )}

              {/* Contenido principal */}
              <div className="text-gray-700 leading-relaxed space-y-4">
                {blog.content ? (
                  <div
                    className="whitespace-pre-wrap prose prose-lg max-w-none"
                    style={{
                      lineHeight: "1.8",
                      fontSize: "1.1rem",
                    }}
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                  />
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <p>Não há conteúdo disponível para esta entrada.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Footer del artículo */}
            <div className="mt-12 pt-6 border-t border-gray-200">
              <div className="flex flex-wrap items-center justify-between">
                <div className="text-sm text-gray-500">
                  Publicado em {formatDate(blog.created_at)}
                  {blog.updated_at !== blog.created_at && (
                    <span> • Atualizado em {formatDate(blog.updated_at)}</span>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                    {blog.status === 'published' ? 'Publicado' : 'Rascunho'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* Sección de navegación adicional */}
        <div className="mt-8 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
          >
            Ver mais entradas do blog
          </Link>
        </div>
      </div>
    </div>
  );
}

// Generar metadata dinámico para SEO
export async function generateMetadata({ params }: BlogDetailPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  
  try {
    const { blog } = await getBlogDetails(slug);
    
    if (!blog) {
      return {
        title: 'Blog não encontrado',
        description: 'A entrada do blog que você procura não existe.',
      };
    }

    return {
      title: `${blog.title} | Blog Espiritual`,
      description: blog.description || `Leia ${blog.title} em nosso blog espiritual`,
      keywords: `blog, espiritual, ${blog.title}, ${blog.category_id}`,
      authors: [{ name: 'Blog Espiritual' }],
      openGraph: {
        title: blog.title,
        description: blog.description || `Leia ${blog.title} em nosso blog espiritual`,
        type: 'article',
        publishedTime: blog.created_at,
        modifiedTime: blog.updated_at,
        images: blog.image ? [
          {
            url: blog.image,
            width: 1200,
            height: 630,
            alt: blog.title,
          }
        ] : [],
        url: `/blog/${slug}`,
      },
      twitter: {
        card: 'summary_large_image',
        title: blog.title,
        description: blog.description || `Leia ${blog.title} em nosso blog espiritual`,
        images: blog.image ? [blog.image] : [],
      },
      robots: {
        index: blog.status === 'published',
        follow: blog.status === 'published',
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Erro | Blog Espiritual',
      description: 'Erro ao carregar a entrada do blog'
    };
  }
}