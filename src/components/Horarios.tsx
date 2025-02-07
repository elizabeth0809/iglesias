import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function HorariosMisas() {
  const horarios = [
    { dia: "Domingo", hora: "9:00 AM y 11:00 AM" },
    { dia: "Miércoles", hora: "7:00 PM" },
    { dia: "Viernes", hora: "8:00 PM (Jóvenes)" },
  ];

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="text-2xl">Horarios de Misas/Cultos</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Día</TableHead>
              <TableHead>Hora</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {horarios.map((horario, index) => (
              <TableRow key={index}>
                <TableCell>{horario.dia}</TableCell>
                <TableCell>{horario.hora}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <p className="mt-4">Ubicación: Calle Principal 123, Ciudad, País</p>
      </CardContent>
    </Card>
  );
}
