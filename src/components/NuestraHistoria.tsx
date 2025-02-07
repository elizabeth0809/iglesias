import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function NuestraHistoria() {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="text-2xl">Nuestra Historia</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4">
          Nuestra iglesia fue fundada en 1950 por un grupo de fieles
          comprometidos con la comunidad. Desde entonces, hemos crecido y
          evolucionado, manteniendo siempre nuestros valores fundamentales.
        </p>
        <h3 className="font-semibold mb-2">Hitos importantes:</h3>
        <ul className="list-disc pl-5">
          <li>1950: Fundación de la iglesia</li>
          <li>1975: Construcción de nuestro actual templo</li>
          <li>2000: Inicio de nuestro programa de ayuda comunitaria</li>
          <li>2020: Lanzamiento de nuestros servicios en línea</li>
        </ul>
      </CardContent>
    </Card>
  );
}
