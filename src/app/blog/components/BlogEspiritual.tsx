import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

type BlogPost = {
  id: number;
  titulo: string;
  autor: string;
  fecha: string;
  extracto: string;
  url: string;
  imagen: string;
};

const blogPosts: BlogPost[] = [
  {
    id: 1,
    titulo: "Encontrando paz en tiempos difíciles",
    autor: "Pastor Juan Pérez",
    fecha: "2023-07-20",
    extracto:
      "En este mundo lleno de incertidumbre, ¿cómo podemos encontrar verdadera paz? Exploremos juntos el camino hacia la serenidad espiritual.",
    url: "/blog/encontrando-paz",
    imagen: "https://picsum.photos/400/250?random=1"

  },
  {
    id: 2,
    titulo: "El poder de la gratitud",
    autor: "Pastora María González",
    fecha: "2023-07-15",
    extracto:
      "La gratitud no solo cambia nuestra perspectiva, sino que también transforma nuestras vidas. Descubre cómo cultivar un corazón agradecido.",
    url: "/blog/poder-gratitud",
    imagen: "https://placehold.co/400x250"

  },
  {
    id: 3,
    titulo: "Viviendo una fe auténtica",
    autor: "Pastor Carlos Rodríguez",
    fecha: "2023-07-10",
    extracto:
      "¿Qué significa realmente vivir nuestra fe en el día a día? Reflexiones sobre cómo llevar nuestra creencia más allá de las paredes de la iglesia.",
    url: "/blog/fe-autentica",
    imagen: "https://via.placeholder.com/400x250"

  },
];

export default function BlogEspiritual() {
  return (
    <div className="mb-8">
      <h2 className="text-3xl font-bold text-center mb-6">Blog Espiritual</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogPosts.map((post) => (
          <Card key={post.id} className="overflow-hidden shadow-lg">
            <Image
              src={post.imagen}
              alt={post.titulo}
              width={400}
              height={250}
              className="w-full h-48 object-cover"
            />
            <CardHeader>
              <CardTitle className="text-xl">{post.titulo}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-2">
                Por {post.autor} - {post.fecha}
              </p>
              <p className="mb-4">{post.extracto}</p>
              <Button asChild>
                <a href={post.url}>Leer más</a>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
