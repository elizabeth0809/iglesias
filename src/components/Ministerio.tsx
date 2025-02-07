import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Ministerios() {
  const ministerios = [
    {
      nombre: "Música y alabanza",
      descripcion:
        "Nuestro ministerio de música y alabanza lidera a la congregación en adoración a través de música contemporánea y tradicional. Ofrecemos oportunidades para músicos y cantantes de todos los niveles.",
      actividades: [
        "Ensayos semanales",
        "Participación en servicios dominicales",
        "Conciertos especiales",
      ],
    },
    {
      nombre: "Servicio comunitario",
      descripcion:
        "Nos dedicamos a servir a nuestra comunidad local a través de varios programas de ayuda y apoyo.",
      actividades: [
        "Banco de alimentos",
        "Clases de inglés gratuitas",
        "Asesoramiento familiar",
      ],
    },
    {
      nombre: "Misiones internacionales",
      descripcion:
        "Apoyamos y participamos en misiones internacionales para compartir el amor de Dios en todo el mundo.",
      actividades: [
        "Viajes misioneros anuales",
        "Apoyo a misioneros de largo plazo",
        "Proyectos de ayuda humanitaria",
      ],
    },
  ];

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="text-2xl">Ministerios</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={ministerios[0].nombre}>
          <TabsList>
            {ministerios.map((ministerio, index) => (
              <TabsTrigger key={index} value={ministerio.nombre}>
                {ministerio.nombre}
              </TabsTrigger>
            ))}
          </TabsList>
          {ministerios.map((ministerio, index) => (
            <TabsContent key={index} value={ministerio.nombre}>
              <h3 className="font-semibold mb-2">{ministerio.nombre}</h3>
              <p className="mb-4">{ministerio.descripcion}</p>
              <h4 className="font-semibold mb-2">Actividades:</h4>
              <ul className="list-disc pl-5">
                {ministerio.actividades.map((actividad, actIndex) => (
                  <li key={actIndex}>{actividad}</li>
                ))}
              </ul>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
}
