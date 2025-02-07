import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Image from "next/image";

export default function PastoresLideres() {
  const lideres = [
    {
      nombre: "Pastor Juan Pérez",
      rol: "Pastor Principal",
      imagen: "/placeholder.svg?height=200&width=200",
    },
    {
      nombre: "María González",
      rol: "Pastora de Jóvenes",
      imagen: "/placeholder.svg?height=200&width=200",
    },
    {
      nombre: "Carlos Rodríguez",
      rol: "Director de Música",
      imagen: "/placeholder.svg?height=200&width=200",
    },
  ];

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="text-2xl">Pastores y Líderes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {lideres.map((lider, index) => (
            <div key={index} className="text-center">
              <Image
                src={lider.imagen || "/placeholder.svg"}
                alt={lider.nombre}
                width={200}
                height={200}
                className="rounded-full mx-auto mb-2"
              />
              <h3 className="font-semibold">{lider.nombre}</h3>
              <p>{lider.rol}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
