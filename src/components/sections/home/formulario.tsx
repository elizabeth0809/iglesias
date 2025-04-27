import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React from "react";

export const FormularioComponent = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Fale Conosco</h2>
        <form className="max-w-md mx-auto space-y-4">
          <div>
            <label
              htmlFor="nome"
              className="block text-sm font-medium text-gray-700"
            >
              Nome Completo
            </label>
            <Input id="nome" placeholder="Seu nome completo" />
          </div>
          <div>
            <label
              htmlFor="whatsapp"
              className="block text-sm font-medium text-gray-700"
            >
              WhatsApp
            </label>
            <Input id="whatsapp" placeholder="Seu número de WhatsApp" />
          </div>
          <div>
            <label
              htmlFor="descricao"
              className="block text-sm font-medium text-gray-700"
            >
              Descrição
            </label>
            <Textarea
              id="descricao"
              placeholder="Em que podemos ajudar você?"
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