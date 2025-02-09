import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

type Serie = {
  id: number;
  titulo: string;
  descripcion: string;
  fecha: string;
  episodios: { titulo: string; url: string }[];
};

const series: Serie[] = [
  {
    id: 1,
    titulo: "El Sermón del Monte",
    descripcion:
      "Una serie profunda sobre las enseñanzas de Jesús en Mateo 5-7.",
    fecha: "2023-01",
    episodios: [
      {
        titulo: "Las Bienaventuranzas",
        url: "https://example.com/sermon-monte-1.mp3",
      },
      { titulo: "Sal y Luz", url: "https://example.com/sermon-monte-2.mp3" },
      {
        titulo: "La Oración del Señor",
        url: "https://example.com/sermon-monte-3.mp3",
      },
    ],
  },
  {
    id: 2,
    titulo: "Fruto del Espíritu",
    descripcion:
      "Explorando las características del Espíritu Santo en nuestras vidas.",
    fecha: "2023-04",
    episodios: [
      { titulo: "Amor y Gozo", url: "https://example.com/fruto-1.mp3" },
      { titulo: "Paz y Paciencia", url: "https://example.com/fruto-2.mp3" },
      { titulo: "Benignidad y Bondad", url: "https://example.com/fruto-3.mp3" },
    ],
  },
];

export default function BibliotecaMedias() {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="text-2xl">Biblioteca de Medios</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="fecha">
          <TabsList>
            <TabsTrigger value="fecha">Por Fecha</TabsTrigger>
            <TabsTrigger value="tema">Por Tema</TabsTrigger>
          </TabsList>
          <TabsContent value="fecha">
            {series
              .sort((a, b) => b.fecha.localeCompare(a.fecha))
              .map((serie) => (
                <div key={serie.id} className="mb-4 p-4 border rounded-lg">
                  <h3 className="font-semibold">{serie.titulo}</h3>
                  <p className="text-sm text-gray-600">{serie.fecha}</p>
                  <p>{serie.descripcion}</p>
                  <div className="mt-2">
                    {serie.episodios.map((episodio, index) => (
                      <Button key={index} variant="link" asChild>
                        <a
                          href={episodio.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {episodio.titulo}
                        </a>
                      </Button>
                    ))}
                  </div>
                </div>
              ))}
          </TabsContent>
          <TabsContent value="tema">
            {/* Aquí podrías implementar una vista organizada por temas */}
            <p>Organización por temas en desarrollo...</p>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
