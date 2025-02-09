import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type BlogPost = {
  id: number;
  titulo: string;
  autor: string;
  fecha: string;
  extracto: string;
  url: string;
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
  },
  {
    id: 2,
    titulo: "El poder de la gratitud",
    autor: "Pastora María González",
    fecha: "2023-07-15",
    extracto:
      "La gratitud no solo cambia nuestra perspectiva, sino que también transforma nuestras vidas. Descubre cómo cultivar un corazón agradecido.",
    url: "/blog/poder-gratitud",
  },
  {
    id: 3,
    titulo: "Viviendo una fe auténtica",
    autor: "Pastor Carlos Rodríguez",
    fecha: "2023-07-10",
    extracto:
      "¿Qué significa realmente vivir nuestra fe en el día a día? Reflexiones sobre cómo llevar nuestra creencia más allá de las paredes de la iglesia.",
    url: "/blog/fe-autentica",
  },
];

export default function BlogEspiritual() {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="text-2xl">Blog Espiritual</CardTitle>
      </CardHeader>
      <CardContent>
        {blogPosts.map((post) => (
          <div key={post.id} className="mb-6 p-4 border rounded-lg">
            <h3 className="text-xl font-semibold mb-2">{post.titulo}</h3>
            <p className="text-sm text-gray-600 mb-2">
              Por {post.autor} - {post.fecha}
            </p>
            <p className="mb-4">{post.extracto}</p>
            <Button asChild>
              <a href={post.url}>Leer más</a>
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
