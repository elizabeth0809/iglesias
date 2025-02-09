import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Define the correct types for Next.js 13+ page props
type BlogPost = {
  id: number;
  slug: string;
  titulo: string;
  autor: {
    nombre: string;
    imagen: string;
  };
  fecha: string;
  imagen: string;
  contenido: string;
  tags: string[];
};

// For Next.js pages, we need to use the correct params type
export type PageProps = {
  params: {
    slug: string;
  };
  searchParams?: { [key: string]: string | string[] | undefined };
};

// Simulación de una base de datos de entradas de blog
const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: "encontrando-paz",
    titulo: "Encontrando paz en tiempos difíciles",
    autor: {
      nombre: "Pastor Juan Pérez",
      imagen: "https://i.pravatar.cc/150?u=juanperez",
    },
    fecha: "2023-07-20",
    imagen: "https://picsum.photos/800/400?random=1",
    contenido:
      "En este mundo lleno de incertidumbre, ¿cómo podemos encontrar verdadera paz? Exploremos juntos el camino hacia la serenidad espiritual. La paz es un regalo de Dios que sobrepasa todo entendimiento. A través de la oración, la meditación en Su palabra y la confianza en Sus promesas, podemos experimentar una paz que el mundo no puede dar ni quitar. En este artículo, compartiremos prácticas diarias y versículos bíblicos que te ayudarán a cultivar la paz en tu corazón, sin importar las circunstancias que te rodeen.",
    tags: ["paz", "fe", "espiritualidad"],
  },
  // ... rest of your blog posts
];

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPost({
  params,
}: {
  params: { slug: string };
}) {
  const post = blogPosts.find((post) => post.slug === params.slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = blogPosts
    .filter((p) => p.id !== post.id)
    .filter((p) => p.tags.some((tag) => post.tags.includes(tag)))
    .slice(0, 2);

  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      <Image
        src={post.imagen || "/placeholder.svg"}
        alt={post.titulo}
        width={800}
        height={400}
        className="w-full h-[400px] object-cover rounded-lg mb-8"
      />
      <h1 className="text-4xl font-bold mb-4">{post.titulo}</h1>
      <div className="flex items-center mb-6">
        <Avatar className="h-10 w-10 mr-4">
          <AvatarImage src={post.autor.imagen} alt={post.autor.nombre} />
          <AvatarFallback>{post.autor.nombre[0]}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-semibold">{post.autor.nombre}</p>
          <p className="text-sm text-gray-500">{post.fecha}</p>
        </div>
      </div>
      <div className="prose max-w-none mb-12">
        <p>{post.contenido}</p>
      </div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Etiquetas</h2>
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="bg-gray-200 px-3 py-1 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      {relatedPosts.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Entradas relacionadas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedPosts.map((relatedPost) => (
              <Card key={relatedPost.id}>
                <Image
                  src={relatedPost.imagen || "/placeholder.svg"}
                  alt={relatedPost.titulo}
                  width={400}
                  height={200}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <CardHeader>
                  <CardTitle>{relatedPost.titulo}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-2">
                    Por {relatedPost.autor.nombre} - {relatedPost.fecha}
                  </p>
                  <Button asChild>
                    <Link href={`/blog/${relatedPost.slug}`}>Leer más</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
