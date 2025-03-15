"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Edit, MoreHorizontal, Plus, Search, Trash2 } from "lucide-react"

// Sample data
const sampleSermons = [
  {
    id: 1,
    title: "El camino de la fe",
    speaker: "Pastor Juan Pérez",
    series: "Fe y Esperanza",
    date: "2023-11-05",
    duration: "45 min",
    format: "Video",
  },
  {
    id: 2,
    title: "Viviendo en gracia",
    speaker: "Pastor Carlos Rodríguez",
    series: "Gracia Divina",
    date: "2023-11-12",
    duration: "38 min",
    format: "Audio",
  },
  {
    id: 3,
    title: "El poder de la oración",
    speaker: "Pastor Juan Pérez",
    series: "Fe y Esperanza",
    date: "2023-11-19",
    duration: "42 min",
    format: "Video",
  },
  {
    id: 4,
    title: "Caminando con Dios",
    speaker: "Pastor Miguel Ángel",
    series: "Vida Cristiana",
    date: "2023-11-26",
    duration: "50 min",
    format: "Video",
  },
  {
    id: 5,
    title: "La importancia del perdón",
    speaker: "Pastor Carlos Rodríguez",
    series: "Gracia Divina",
    date: "2023-12-03",
    duration: "40 min",
    format: "Audio",
  },
]

export function SermonsTable() {
  const [sermons, setSermons] = useState(sampleSermons)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredSermons = sermons.filter(
    (sermon) =>
      sermon.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sermon.speaker.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sermon.series.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleDelete = (id: number) => {
    setSermons(sermons.filter((sermon) => sermon.id !== id))
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <h2 className="text-2xl font-bold">Sermones</h2>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Buscar sermones..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Nuevo Sermón
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Título</TableHead>
              <TableHead>Predicador</TableHead>
              <TableHead>Serie</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead>Duración</TableHead>
              <TableHead>Formato</TableHead>
              <TableHead className="w-[80px]">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSermons.length > 0 ? (
              filteredSermons.map((sermon) => (
                <TableRow key={sermon.id}>
                  <TableCell className="font-medium">{sermon.title}</TableCell>
                  <TableCell>{sermon.speaker}</TableCell>
                  <TableCell>{sermon.series}</TableCell>
                  <TableCell>{new Date(sermon.date).toLocaleDateString()}</TableCell>
                  <TableCell>{sermon.duration}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                        sermon.format === "Video" ? "bg-purple-100 text-purple-800" : "bg-orange-100 text-orange-800"
                      }`}
                    >
                      {sermon.format}
                    </span>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Abrir menú</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" /> Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600" onClick={() => handleDelete(sermon.id)}>
                          <Trash2 className="mr-2 h-4 w-4" /> Eliminar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No se encontraron resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

