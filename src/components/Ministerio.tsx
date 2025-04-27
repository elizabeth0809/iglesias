import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Ministerios() {
  const ministerios = [
    {
      nombre: "Música e Louvor",
      descripcion:
        "Nosso ministério de música e louvor lidera a congregação em adoração através de música contemporânea e tradicional. Oferecemos oportunidades para músicos e cantores de todos os níveis.",
      actividades: [
        "Ensaios semanais",
        "Participação em cultos dominicais",
        "Concertos especiais",
      ],
    },
    {
      nombre: "Serviço Comunitário",
      descripcion:
        "Nos dedicamos a servir nossa comunidade local através de vários programas de ajuda e apoio.",
      actividades: [
        "Banco de alimentos",
        "Aulas de inglês gratuitas",
        "Aconselhamento familiar",
      ],
    }
  ];

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="text-2xl">Ministérios</CardTitle>
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
              <h4 className="font-semibold mb-2">Atividades:</h4>
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