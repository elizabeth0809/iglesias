import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function Testimonios() {
  const testimonios = [
    {
      nombre: "Ana García",
      testimonio:
        "Esta iglesia cambió mi vida. Encontré una comunidad amorosa y un propósito más grande.",
    },
    {
      nombre: "Luis Martínez",
      testimonio:
        "Gracias a los programas de la iglesia, pude superar momentos difíciles y fortalecer mi fe.",
    },
  ];

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="text-2xl">Testimonios</CardTitle>
      </CardHeader>
      <CardContent>
        {testimonios.map((testimonio, index) => (
          <div key={index} className="mb-4">
            <p className="italic mb-2">"{testimonio.testimonio}"</p>
            <p className="text-right">- {testimonio.nombre}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
