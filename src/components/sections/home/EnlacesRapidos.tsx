import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";

export const EnlacesRapidos = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Enlaces Rápidos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "Sermones",
              description: "Escucha nuestros mensajes más recientes",
              link: "/sermones-medios",
            },
            {
              title: "Ministerios",
              description: "Descubre cómo puedes servir",
              link: "/servicios-actividades",
            },
            {
              title: "Donaciones",
              description: "Apoya nuestra misión",
              link: "/donaciones",
            },
            {
              title: "Contacto",
              description: "Ponte en contacto con nosotros",
              link: "/contacto",
            },
          ].map((item, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{item.title}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button asChild variant="ghost">
                  <Link href={item.link}>
                    Más Información <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
