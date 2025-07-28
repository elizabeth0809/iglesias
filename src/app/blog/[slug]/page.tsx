import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CalendarIcon,
  Clock,
  ArrowLeft,
  BookOpen,
  Heart,
  Eye,
  Sparkles,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { IBlogResponse } from "@/insfractucture/interfaces/blogs/blog.interfaces";
import { blogGetBySlugGraphQLAction } from "@/insfractucture/actions/eventos/graphql/get-eventos-by-slugs.actions";
import { BlogShareWrapper } from "@/app/components/blogShared";

// Tipos para los componentes de ReactMarkdown
interface MarkdownComponentProps {
  children?: React.ReactNode;
}

interface LinkProps extends MarkdownComponentProps {
  href?: string;
}

interface CodeProps extends MarkdownComponentProps {
  className?: string;
}

interface ImageProps extends MarkdownComponentProps {
  src?: string;
  alt?: string;
}

async function getBlogDetails(
  slug: string
): Promise<{ blog: IBlogResponse | null; error?: string }> {
  try {
    console.log("🔄 Obteniendo blog por slug desde GraphQL:", slug);
    const blog = await blogGetBySlugGraphQLAction(slug);

    if (!blog) {
      console.log("❌ Blog no encontrado con slug:", slug);
      return { blog: null };
    }

    console.log("✅ Blog encontrado:", blog.title);
    return { blog };
  } catch (error) {
    console.error("Error fetching blog details from GraphQL:", error);
    return {
      blog: null,
      error: "Error al cargar el blog desde GraphQL",
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

  if (error || !blog) {
    console.log("❌ Blog no encontrado o error:", { slug, error });
    notFound();
  }

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("pt-BR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch (error) {
      console.error("Error formatting date:", error);
      return dateString;
    }
  };

  const estimateReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return `${minutes} min de leitura`;
  };

  // Componentes personalizados para el markdown
  const markdownComponents = {
    h1: ({ children }: MarkdownComponentProps) => (
      <h1 className="text-3xl font-bold text-church-blue-900 mb-6 mt-8 border-b-2 border-church-gold-500 pb-2">
        {children}
      </h1>
    ),
    h2: ({ children }: MarkdownComponentProps) => (
      <h2 className="text-2xl font-bold text-church-blue-800 mb-4 mt-6">
        {children}
      </h2>
    ),
    h3: ({ children }: MarkdownComponentProps) => (
      <h3 className="text-xl font-semibold text-church-blue-700 mb-3 mt-5">
        {children}
      </h3>
    ),
    p: ({ children }: MarkdownComponentProps) => (
      <p className="text-church-blue-700 mb-4 leading-relaxed text-lg">
        {children}
      </p>
    ),
    blockquote: ({ children }: MarkdownComponentProps) => (
      <blockquote className="border-l-4 border-church-gold-500 bg-church-gold-50 pl-6 py-4 my-6 italic text-church-blue-800 rounded-r-lg">
        {children}
      </blockquote>
    ),
    ul: ({ children }: MarkdownComponentProps) => (
      <ul className="list-disc list-inside text-church-blue-700 mb-4 space-y-2 ml-4">
        {children}
      </ul>
    ),
    ol: ({ children }: MarkdownComponentProps) => (
      <ol className="list-decimal list-inside text-church-blue-700 mb-4 space-y-2 ml-4">
        {children}
      </ol>
    ),
    li: ({ children }: MarkdownComponentProps) => (
      <li className="mb-1 leading-relaxed">{children}</li>
    ),
    strong: ({ children }: MarkdownComponentProps) => (
      <strong className="font-bold text-church-blue-900">{children}</strong>
    ),
    em: ({ children }: MarkdownComponentProps) => (
      <em className="italic text-church-blue-800">{children}</em>
    ),
    a: ({ href, children }: LinkProps) => (
      <a
        href={href}
        className="text-church-blue-600 hover:text-church-gold-600 underline font-medium transition-colors duration-200"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
    code: ({ children, className }: CodeProps) => {
      const isInline = !className;
      if (isInline) {
        return (
          <code className="bg-church-sky-100 text-church-blue-800 px-2 py-1 rounded text-sm font-mono">
            {children}
          </code>
        );
      }
      return (
        <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto my-4">
          <code className={className}>{children}</code>
        </pre>
      );
    },
    table: ({ children }: MarkdownComponentProps) => (
      <div className="overflow-x-auto my-6">
        <table className="min-w-full bg-white border border-church-sky-200 rounded-lg">
          {children}
        </table>
      </div>
    ),
    thead: ({ children }: MarkdownComponentProps) => (
      <thead className="bg-church-blue-500 text-white">{children}</thead>
    ),
    th: ({ children }: MarkdownComponentProps) => (
      <th className="px-4 py-3 text-left font-semibold">{children}</th>
    ),
    td: ({ children }: MarkdownComponentProps) => (
      <td className="px-4 py-3 border-t border-church-sky-200 text-church-blue-700">
        {children}
      </td>
    ),
    hr: () => <hr className="my-8 border-t-2 border-church-gold-300" />,
    img: ({ src, alt }: ImageProps) => (
      <div className="my-6">
        <Image
          src={src || ""}
          alt={alt || "Imagen del blog"}
          width={800}
          height={400}
          className="rounded-lg shadow-lg mx-auto"
        />
      </div>
    ),
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-church-sky-50 via-white to-church-blue-50 relative overflow-hidden"
      suppressHydrationWarning={true}
    >
      {/* Decoración de fondo */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 right-10 w-32 h-32 bg-church-gold-400 rounded-full animate-pulse"></div>
        <div
          className="absolute bottom-20 left-10 w-24 h-24 bg-church-blue-400 rounded-full animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/4 w-16 h-16 bg-church-red-400 rounded-full animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-4xl relative z-10">
        {/* Botón de volver mejorado */}
        <div className="mb-8">
          <Link
            href="/blog"
            className="group inline-flex items-center px-4 py-2 bg-church-blue-500 text-white rounded-lg hover:bg-church-blue-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
            Voltar ao blog
          </Link>
        </div>

        <article className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-church-sky-200">
          {/* Línea decorativa superior */}
          <div className="h-1 bg-gradient-to-r from-church-blue-400 via-church-gold-400 to-church-blue-400"></div>

          {/* Imagen principal */}
          <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden">
            <Image
              src={blog.image || "/placeholder.svg"}
              alt={blog.title}
              fill
              className="object-cover transition-transform duration-500 hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

            {/* Badges flotantes */}
            <div className="absolute top-6 left-6">
              <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-church-blue-500 text-white shadow-lg backdrop-blur-sm">
                📖 Reflexão Espiritual
              </span>
            </div>

            {/* ShareButton flotante reemplazando el botón original */}
            <div className="absolute top-6 right-6">
              <BlogShareWrapper
                title={blog.title}
                description={blog.description}
                slug={slug}
                variant="floating"
                size="md"
                className="bg-church-gold-500/80 hover:bg-church-gold-600"
                shareText="Compartilhar Reflexão"
                copyText="Copiar Link do Blog"
                toastMessage="Link da reflexão copiado para a área de transferência!"
              />
            </div>

            <div className="absolute bottom-6 left-6 right-6">
              <div className="bg-white/90 backdrop-blur-md rounded-xl p-4 shadow-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-church-blue-700">
                    <div className="flex items-center">
                      <Eye className="w-4 h-4 mr-1" />
                      <span>
                        {blog.content
                          ? estimateReadingTime(blog.content)
                          : "5 min"}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <CalendarIcon className="w-4 h-4 mr-1" />
                      <span>{formatDate(blog.created_at)}</span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Heart className="w-4 h-4 text-church-red-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8 md:p-12">
            {/* Header del artículo */}
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="relative bg-church-gold-500 rounded-full p-3 shadow-lg">
                  <BookOpen className="w-6 h-6 text-white" />
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-church-red-500 rounded-full flex items-center justify-center">
                    <Sparkles className="w-2 h-2 text-white" />
                  </div>
                </div>
              </div>

              <h1 className="text-3xl md:text-5xl font-bold text-church-blue-900 mb-6 leading-tight">
                {blog.title}
              </h1>

              <div className="w-24 h-1 bg-church-gold-500 mx-auto rounded-full"></div>
            </div>

            {/* Metadatos mejorados */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-church-sky-50 rounded-xl p-4 border border-church-sky-200">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-church-blue-500 rounded-lg flex items-center justify-center">
                    <CalendarIcon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-church-blue-600 font-medium">
                      Publicado em
                    </p>
                    <p className="text-church-blue-900 font-semibold">
                      {formatDate(blog.created_at)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-church-gold-50 rounded-xl p-4 border border-church-gold-200">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-church-gold-500 rounded-lg flex items-center justify-center">
                    <Clock className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-church-gold-600 font-medium">
                      Tempo de leitura
                    </p>
                    <p className="text-church-gold-900 font-semibold">
                      {blog.content
                        ? estimateReadingTime(blog.content)
                        : "5 min"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-church-red-50 rounded-xl p-4 border border-church-red-200">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-church-red-500 rounded-lg flex items-center justify-center">
                    <BookOpen className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-church-red-600 font-medium">
                      Status
                    </p>
                    <p className="text-church-red-900 font-semibold">
                      {blog.status === "published"
                        ? "✅ Publicado"
                        : "📝 Rascunho"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contenido principal */}
            <div className="prose prose-lg max-w-none">
              {/* Descripción como extracto destacado */}
              {blog.description && (
                <div className="bg-gradient-to-r from-church-gold-100 to-church-blue-100 border-l-4 border-church-gold-500 rounded-r-xl p-6 mb-8 shadow-lg">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-church-gold-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <Heart className="w-4 h-4 text-white" />
                    </div>
                    <blockquote className="text-xl text-church-blue-800 font-medium italic leading-relaxed">
                      &ldquo;{blog.description}&rdquo;
                    </blockquote>
                  </div>
                </div>
              )}

              {/* Contenido principal con Markdown */}
              <div className="bg-white/80 rounded-xl p-8 border border-church-sky-200 shadow-lg">
                <div className="text-church-blue-700 leading-relaxed">
                  {blog.content ? (
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeRaw]}
                      components={markdownComponents}
                    >
                      {blog.content}
                    </ReactMarkdown>
                  ) : (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-church-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <BookOpen className="w-8 h-8 text-church-blue-600" />
                      </div>
                      <p className="text-church-blue-600 text-lg">
                        Não há conteúdo disponível para esta entrada.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Footer del artículo mejorado */}
            <div className="mt-12 pt-8 border-t border-church-sky-200">
              <div className="bg-church-sky-50 rounded-xl p-6 border border-church-sky-200">
                <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
                  <div className="text-church-blue-600">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-2 h-2 bg-church-gold-500 rounded-full"></div>
                      <span className="text-sm font-medium">
                        Publicado em {formatDate(blog.created_at)}
                      </span>
                    </div>
                    {blog.updated_at !== blog.created_at && (
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-church-blue-500 rounded-full"></div>
                        <span className="text-sm">
                          Atualizado em {formatDate(blog.updated_at)}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center space-x-3">
                    <span
                      className={`px-4 py-2 rounded-full text-sm font-semibold ${
                        blog.status === "published"
                          ? "bg-church-gold-500 text-white"
                          : "bg-gray-500 text-white"
                      }`}
                    >
                      {blog.status === "published"
                        ? "✨ Publicado"
                        : "📝 Rascunho"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* Call to action final */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-church-blue-500 to-church-gold-500 p-8 rounded-2xl text-white shadow-xl">
            <h3 className="text-2xl font-bold mb-3 flex items-center justify-center">
              <Sparkles className="w-6 h-6 mr-2" />
              Gostou desta reflexão?
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Explore mais conteúdos espirituais em nosso blog
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/blog"
                className="group inline-flex items-center justify-center px-8 py-3 bg-white text-church-blue-600 rounded-lg font-semibold hover:bg-church-sky-50 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <BookOpen className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                Ver mais entradas do blog
              </Link>

              {/* ShareButton adicional en el CTA */}
              <BlogShareWrapper
                title={blog.title}
                description={blog.description}
                variant="primary"
                size="md"
                className="bg-church-gold-500 hover:bg-church-gold-600"
                shareText="Compartilhar Reflexão"
                copyText="Copiar Link"
                successText="Reflexão Compartilhada!"
                toastMessage="Link da reflexão espiritual copiado!"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Generar metadata dinámico para SEO (mantenido igual)
export async function generateMetadata({
  params,
}: BlogDetailPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  try {
    const { blog } = await getBlogDetails(slug);

    if (!blog) {
      return {
        title: "Blog não encontrado - Igreja Batista Renovada Sonho de Deus",
        description: "A entrada do blog que você procura não existe.",
      };
    }

    return {
      title: `${blog.title} | Blog Espiritual - Igreja Batista Renovada Sonho de Deus`,
      description:
        blog.description || `Leia ${blog.title} em nosso blog espiritual`,
      keywords: `blog espiritual, reflexão cristã, ${blog.title}, ${blog.category_id}, igreja batista, fé, crescimento espiritual`,
      authors: [{ name: "Igreja Batista Renovada Sonho de Deus" }],
      openGraph: {
        title: blog.title,
        description:
          blog.description || `Leia ${blog.title} em nosso blog espiritual`,
        type: "article",
        publishedTime: blog.created_at,
        modifiedTime: blog.updated_at,
        images: blog.image
          ? [
              {
                url: blog.image,
                width: 1200,
                height: 630,
                alt: blog.title,
              },
            ]
          : [],
        url: `/blog/${slug}`,
      },
      twitter: {
        card: "summary_large_image",
        title: blog.title,
        description:
          blog.description || `Leia ${blog.title} em nosso blog espiritual`,
        images: blog.image ? [blog.image] : [],
      },
      robots: {
        index: blog.status === "published",
        follow: blog.status === "published",
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Erro | Blog Espiritual - Igreja Batista Renovada Sonho de Deus",
      description: "Erro ao carregar a entrada do blog",
    };
  }
}
