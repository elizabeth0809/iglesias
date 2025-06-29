"use client";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { toast } from "sonner";

const contactSchema = z.object({
  nome: z
    .string()
    .min(1, { message: "Nome é obrigatório" })
    .min(2, { message: "Nome deve ter pelo menos 2 caracteres" }),
  whatsapp: z
    .string()
    .min(1, { message: "WhatsApp é obrigatório" })
    .regex(/^\(\d{2}\)\s\d{4,5}-\d{4}$|^\d{10,11}$/, { 
      message: "Formato de WhatsApp inválido" 
    }),
  descricao: z
    .string()
    .min(1, { message: "Descrição é obrigatória" })
    .min(10, { message: "Descrição deve ter pelo menos 10 caracteres" })
    .max(500, { message: "Descrição deve ter no máximo 500 caracteres" }),
});

type FormInput = z.infer<typeof contactSchema>;

export const useContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      nome: "",
      whatsapp: "",
      descricao: "",
    },
  });

  const onSubmit: SubmitHandler<FormInput> = async (data: FormInput) => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao enviar mensagem');
      }

      const result = await response.json();
      console.log('Formulário enviado com sucesso:', result);
      toast.success('Mensagem enviada com sucesso!');
      toast.success('Entraremos em contato em breve.');
      reset(); // Limpar formulário após sucesso
      
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
      toast.error( 'Erro ao enviar mensagem. Tente novamente.');
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