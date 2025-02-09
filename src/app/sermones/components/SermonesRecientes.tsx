"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

type Sermon = {
  id: number;
  titulo: string;
  pastor: string;
  fecha: string;
  tema: string;
  videoUrl: string;
};

const sermones: Sermon[] = [
  {
    id: 1,
    titulo: "El poder de la fe",
    pastor: "Pastor Juan Pérez",
    fecha: "2023-07-01",
    tema: "Fe",
    videoUrl: "https://example.com/sermon1.mp4",
  },
  {
    id: 2,
    titulo: "Amor en acción",
    pastor: "Pastora María González",
    fecha: "2023-07-08",
    tema: "Amor",
    videoUrl: "https://example.com/sermon2.mp4",
  },
  {
    id: 3,
    titulo: "Viviendo con esperanza",
    pastor: "Pastor Carlos Rodríguez",
    fecha: "2023-07-15",
    tema: "Esperanza",
    videoUrl: "https://example.com/sermon3.mp4",
  },
];

export default function SermonesRecientes() {
  const [filtroTema, setFiltroTema] = useState<string>("");
  const [filtroPastor, setFiltroPastor] = useState<string>("");

  const sermonesFiltrados = sermones.filter(
    (sermon) =>
      (filtroTema === "" || sermon.tema === filtroTema) &&
      (filtroPastor === "" || sermon.pastor === filtroPastor)
  );

  const temas = Array.from(new Set(sermones.map((sermon) => sermon.tema)));
  const pastores = Array.from(new Set(sermones.map((sermon) => sermon.pastor)));

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="text-2xl">Sermones Recientes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-4 mb-4">
          <Select onValueChange={setFiltroTema}>
            <SelectTrigger>
              <SelectValue placeholder="Filtrar por tema" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos los temas</SelectItem>
              {temas.map((tema) => (
                <SelectItem key={tema} value={tema}>
                  {tema}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select onValueChange={setFiltroPastor}>
            <SelectTrigger>
              <SelectValue placeholder="Filtrar por pastor" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos los pastores</SelectItem>
              {pastores.map((pastor) => (
                <SelectItem key={pastor} value={pastor}>
                  {pastor}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-4">
          {sermonesFiltrados.map((sermon) => (
            <div key={sermon.id} className="border p-4 rounded-lg">
              <h3 className="font-semibold">{sermon.titulo}</h3>
              <p>
                {sermon.pastor} - {sermon.fecha}
              </p>
              <p>Tema: {sermon.tema}</p>
              <video controls className="w-full mt-2">
                <source src={sermon.videoUrl} type="video/mp4" />
                Tu navegador no soporta el tag de video.
              </video>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
