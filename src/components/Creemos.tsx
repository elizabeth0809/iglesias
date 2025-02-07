import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function Creemos() {
  const creencias = [
    "La Biblia es la palabra inspirada de Dios",
    "Jesús es el Hijo de Dios y el Salvador de la humanidad",
    "La salvación es por gracia mediante la fe en Jesucristo",
    "El Espíritu Santo guía y empodera a los creyentes",
    "La iglesia es el cuerpo de Cristo en la tierra",
  ];

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="text-2xl">Creemos (Doctrina)</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4">
          Nuestra fe se basa en las enseñanzas de la Biblia y en la persona de
          Jesucristo. Creemos en un Dios amoroso que desea tener una relación
          personal con cada uno de nosotros.
        </p>
        <h3 className="font-semibold mb-2">
          Nuestras creencias fundamentales:
        </h3>
        <ul className="list-disc pl-5">
          {creencias.map((creencia, index) => (
            <li key={index}>{creencia}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
