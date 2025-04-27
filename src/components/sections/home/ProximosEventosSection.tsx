import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Clock} from "lucide-react";
import Image from "next/image";
import React from "react";

export const ProximosEventosSection = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Nossas atividades
        </h2>
        {/* Ajustando el grid para diferentes tamaños de pantalla */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[
            {
              title: "Culto Dominical",
              date: "Todos os domingos.",
              time: "18:00",
              image: "/estudios-biblicos.png",
            },
            {
              title: "Estudo Bíblico.",
              date: "Todas as segundas-feiras.",
              time: "19:30",
              image: "/estudios-biblicos.png",
            },
            {
              title: "Serviço de Adoração.",
              date: "Todas as quartas-feiras.",
              time: "19:30",
              image: "/adoracionn.png",
            },
            {
              title: "Serviço de Oração",
              date: "Todas as sextas-feiras.",
              time: "19:30",
              image: "/oracion-nuevo.png",
            },
          ].map((event, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{event.title}</CardTitle>
                <CardDescription>{event.date}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Clock className="mr-2 h-4 w-4" /> {event.time}
                </div>
                <div className="relative w-full" style={{ height: "300px" }}>
                  <Image
                    src={event.image}
                    alt={event.title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
