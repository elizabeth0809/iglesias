import { IComunidadeResponse } from '@/insfractucture/interfaces/comunidade/comunidades.interfaces';
import { notFound } from 'next/navigation';
import { SingleComunidadeComponent } from '../components/SingleComunidadeComponent';
import { comunidadesGetAllGraphQLSimpleAction } from '@/insfractucture/actions/comunidade/comundade.actions';
import { getComunidadeBySlugAction } from '@/insfractucture/actions/comunidade/get-single-comunidade-action';


// Función para obtener comunidade por slug usando GraphQL
async function getComunidadeBySlug(slug: string): Promise<{ 
  comunidade: IComunidadeResponse | null; 
  error?: string 
}> {
  try {
    console.log('🔄 Obteniendo comunidade por slug desde GraphQL:', slug);
    const result = await getComunidadeBySlugAction(slug);
        
    if (!result.comunidade) {
      console.log('❌ Comunidade no encontrada con slug:', slug);
      return { comunidade: null, error: result.error };
    }
        
    console.log('✅ Comunidade encontrada:', result.comunidade.name);
    return { comunidade: result.comunidade };
  } catch (error) {
    console.error('Error fetching comunidade from GraphQL:', error);
    return {
      comunidade: null,
      error: 'Error al cargar la comunidade desde GraphQL'
    };
  }
}

interface ComunidadePageProps {
  params: Promise<{ slug: string }>;
}

export default async function ComunidadePage({ params }: ComunidadePageProps) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  const { comunidade, error } = await getComunidadeBySlug(slug);

  // Si hay error o no se encuentra la comunidade, mostrar 404
  if (error || !comunidade) {
    console.log('❌ Comunidade no encontrada o error:', { slug, error });
    notFound();
  }

  return (
    <div suppressHydrationWarning={true}>
      <SingleComunidadeComponent comunidade={comunidade} />
    </div>
  );
}

// Generar metadata dinámicos para SEO
export async function generateMetadata({ params }: ComunidadePageProps) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  let comunidade: IComunidadeResponse | null = null;

  try {
    const result = await getComunidadeBySlug(slug);
    comunidade = result.comunidade;
  } catch (error) {
    console.error('Error generating metadata:', error);
  }

  if (!comunidade) {
    return {
      title: 'Comunidade não encontrada',
      description: 'A comunidade que você procura não está disponível.',
    };
  }

  // Limpiar descripción para metadata (remover markdown y caracteres especiales)
  const cleanDescription = comunidade.description 
    ? comunidade.description
        .replace(/[#*_~`]/g, '') // Remover markdown
        .replace(/\n/g, ' ') // Remover saltos de línea
        .substring(0, 160)
    : `Conheça mais sobre ${comunidade.name} - Nossa Comunidade`;

  return {
    title: `${comunidade.name} - Nossa Comunidade`,
    description: cleanDescription,
    keywords: [
      'comunidade',
      'cristã',
      'igreja batista',
      'ministério',
      comunidade.name,
      'família espiritual',
    ].filter(Boolean).join(', '),
    openGraph: {
      title: `${comunidade.name} - Nossa Comunidade`,
      description: cleanDescription,
      images: comunidade.image ? [
        {
          url: comunidade.image,
          width: 1200,
          height: 630,
          alt: comunidade.name,
        },
      ] : [],
      type: 'article',
      publishedTime: comunidade.created_at,
      modifiedTime: comunidade.updated_at,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${comunidade.name} - Nossa Comunidade`,
      description: cleanDescription,
      images: comunidade.image ? [comunidade.image] : [],
    },
    alternates: {
      canonical: `/comunidades/${slug}`,
    },
  };
}

// Opcional: Generar rutas estáticas en build time para mejor performance
export async function generateStaticParams() {
  try {
    // Importar la acción para obtener todas las comunidades
   
    const comunidades = await comunidadesGetAllGraphQLSimpleAction();
    
    console.log('🏗️ Generating static params for comunidades:', comunidades.length);
    
    return comunidades
      .filter(comunidade => comunidade.slug) 
      .map((comunidade) => ({
        slug: comunidade.slug,
      }));
  } catch (error) {
    console.error('Error generating static params for comunidades:', error);
    return [];
  }
}