import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function NoticiasRecientes() {
  const noticias = [
    {
      titulo: "Gran éxito en nuestro retiro de jóvenes",
      enlace: "/blog/retiro-jovenes",
    },
    {
      titulo: "Campaña de ayuda comunitaria este fin de semana",
      enlace: "/blog/campana-ayuda",
    },
  ];

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Noticias Recientes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {noticias.map((noticia, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{noticia.titulo}</CardTitle>
            </CardHeader>
            <CardContent>
              <Link
                href={noticia.enlace}
                className="text-blue-600 hover:underline"
              >
                Leer más
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
