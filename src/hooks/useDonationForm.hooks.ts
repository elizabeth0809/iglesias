"use client";

import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { toast } from "sonner";

// Esquema solo para validación del formulario (sin transformación)
const donationFormSchema = z.object({
  nome: z
    .string()
    .min(1, { message: "Nome é obrigatório" })
    .min(2, { message: "Nome deve ter pelo menos 2 caracteres" }),
  monto: z
    .string()
    .min(1, { message: "Valor é obrigatório" })
    .refine((val) => {
      const normalizedVal = val.replace(',', '.');
      const num = parseFloat(normalizedVal);
      return !isNaN(num) && num > 0;
    }, { message: "Digite um valor válido maior que R$ 0,00" })
    .refine((val) => {
      const normalizedVal = val.replace(',', '.');
      const num = parseFloat(normalizedVal);
      return num <= 999999.99;
    }, { message: "Valor muito alto" }),
  comentario: z
    .string()
    .optional()
    .or(z.literal(""))
});

type DonationFormInput = z.infer<typeof donationFormSchema>;

export const useDonationForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<DonationFormInput>({
    resolver: zodResolver(donationFormSchema),
    defaultValues: {
      nome: "",
      monto: "",
      comentario: "",
    },
  });

  const onSubmit: SubmitHandler<DonationFormInput> = async (formData: DonationFormInput) => {
    setIsSubmitting(true);
    
    try {
      // Transformar os dados aqui antes de enviar
      const processedData = {
        nome: formData.nome,
        monto: parseFloat(formData.monto.replace(',', '.')), // Convertir aquí
        comentario: formData.comentario || ""
      };

      const response = await fetch('/api/donation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(processedData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao registrar doação');
      }

      const result = await response.json();
      console.log('Doação registrada com sucesso:', result);
      toast.success('Doação registrada com sucesso!');
      toast.success('Obrigado por sua generosidade!');
      reset();
      
    } catch (error) {
      console.error('Erro ao registrar doação:', error);
      toast.error('Erro ao registrar doação. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    control,
    errors,
    isSubmitting,
    handleSubmit,
    onSubmit,
  };
};