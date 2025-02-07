import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function ProgramasEspeciales() {
  const programas = [
    {
      nombre: "Grupos de jóvenes",
      descripcion:
        "Reuniones semanales para jóvenes de 13 a 25 años. Incluye actividades sociales, estudios bíblicos y proyectos de servicio comunitario.",
      horario: "Viernes, 8:00 PM",
    },
    {
      nombre: "Escuela dominical para niños",
      descripcion:
        "Clases de educación cristiana para niños de 3 a 12 años, divididas por grupos de edad.",
      horario: "Domingos, 10:00 AM",
    },
    {
      nombre: "Estudios bíblicos",
      descripcion:
        "Grupos de estudio bíblico para adultos, explorando diferentes libros y temas de la Biblia.",
      horario: "Martes, 7:00 PM",
    },
  ];

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="text-2xl">Programas Especiales</CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible>
          {programas.map((programa, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>{programa.nombre}</AccordionTrigger>
              <AccordionContent>
                <p>{programa.descripcion}</p>
                <p className="mt-2">
                  <strong>Horario:</strong> {programa.horario}
                </p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}
