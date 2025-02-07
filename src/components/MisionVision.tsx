import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function MisionVision() {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="text-2xl">Misión y Visión</CardTitle>
      </CardHeader>
      <CardContent>
        <h3 className="font-semibold mb-2">Misión:</h3>
        <p className="mb-4">
          Nuestra misión es compartir el amor de Dios, hacer discípulos de
          Jesucristo y servir a nuestra comunidad con compasión y gracia.
        </p>
        <h3 className="font-semibold mb-2">Visión:</h3>
        <p>
          Aspiramos a ser una iglesia vibrante y creciente que impacte
          positivamente a nuestra ciudad y más allá, transformando vidas a
          través del poder del Evangelio.
        </p>
      </CardContent>
    </Card>
  );
}
