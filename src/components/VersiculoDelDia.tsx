import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function VersiculoDelDia() {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Versículo del Día</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-lg italic">
          "Porque de tal manera amó Dios al mundo, que ha dado a su Hijo
          unigénito, para que todo aquel que en él cree, no se pierda, mas tenga
          vida eterna."
        </p>
        <p className="text-right mt-2">- Juan 3:16</p>
      </CardContent>
    </Card>
  );
}
