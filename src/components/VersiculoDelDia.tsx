import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function VersiculoDoDia() {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Versículo do Dia</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-lg italic">
          Pois Deus amou o mundo de tal maneira que deu o seu único Filho,
          para que todo aquele que nele crê não morra, mas tenha a vida eterna.
        </p>
        <p className="text-right mt-2">- João 3:16</p>
      </CardContent>
    </Card>
  );
}