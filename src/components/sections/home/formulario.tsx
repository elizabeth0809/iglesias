"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Controller } from "react-hook-form";

import React from "react";
import { useContactForm } from "@/hooks/useContactForm.hooks";

export const FormularioComponent = () => {
  const { control, errors, isSubmitting, handleSubmit, onSubmit } = useContactForm();

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Fale Conosco</h2>
        
        <form 
          className="max-w-md mx-auto space-y-4" 
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <label
              htmlFor="nome"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Nome Completo
            </label>
            <Controller
              control={control}
              name="nome"
              render={({ field }) => (
                <div>
                  <Input
                    id="nome"
                    type="text"
                    placeholder="Seu nome completo"
                    value={field.value}
                    onChange={field.onChange}
                    className={`${errors.nome ? "border-red-500" : ""}`}
                  />
                  {errors.nome && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.nome.message}
                    </p>
                  )}
                </div>
              )}
            />
          </div>

          <div>
            <label
              htmlFor="whatsapp"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              WhatsApp
            </label>
            <Controller
              control={control}
              name="whatsapp"
              render={({ field }) => (
                <div>
                  <Input
                    id="whatsapp"
                    type="tel"
                    placeholder="(11) 99999-9999"
                    value={field.value}
                    onChange={field.onChange}
                    className={`${errors.whatsapp ? "border-red-500" : ""}`}
                  />
                  {errors.whatsapp && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.whatsapp.message}
                    </p>
                  )}
                </div>
              )}
            />
          </div>

          <div>
            <label
              htmlFor="descricao"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Descrição
            </label>
            <Controller
              control={control}
              name="descricao"
              render={({ field }) => (
                <div>
                  <Textarea
                    id="descricao"
                    placeholder="Em que podemos ajudar você?"
                    rows={4}
                    value={field.value}
                    onChange={field.onChange}
                    className={`resize-none ${errors.descricao ? "border-red-500" : ""}`}
                  />
                  {errors.descricao && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.descricao.message}
                    </p>
                  )}
                </div>
              )}
            />
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            disabled={isSubmitting}
          >
            {isSubmitting ? "Enviando..." : "Enviar"}
          </Button>
        </form>
      </div>
    </section>
  );
};