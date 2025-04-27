import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React from "react";

export const FormularioComponent = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Contáctanos</h2>
        <form className="max-w-md mx-auto space-y-4">
          <div>
            <label
              htmlFor="nombre"
              className="block text-sm font-medium text-gray-700"
            >
              Nombre completo
            </label>
            <Input id="nombre" placeholder="Tu nombre completo" />
          </div>
          <div>
            <label
              htmlFor="whatsapp"
              className="block text-sm font-medium text-gray-700"
            >
              WhatsApp
            </label>
            <Input id="whatsapp" placeholder="Tu número de WhatsApp" />
          </div>
          <div>
            <label
              htmlFor="descripcion"
              className="block text-sm font-medium text-gray-700"
            >
              Descripción
            </label>
            <Textarea
              id="descripcion"
              placeholder="¿En qué podemos ayudarte?"
            />
          </div>
          <Button type="submit" className="w-full">
            Enviar
          </Button>
        </form>
      </div>
    </section>
  );
};
