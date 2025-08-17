"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Controller } from "react-hook-form";
import React, { useState, useEffect } from "react";
import { useDonationForm } from "@/hooks/useDonationForm.hooks";
import { User, DollarSign, MessageCircle, Send, Heart, CheckCircle, Receipt } from "lucide-react";

export const FormularioDoacaoComponent = () => {
  const { control, errors, isSubmitting, handleSubmit, onSubmit } = useDonationForm();
  const [isLoaded, setIsLoaded] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="py-12 relative">
      <div className="container mx-auto px-4">
        {/* Header do formulário */}
        <div className={`text-center mb-12 transition-all duration-1000 ease-out ${
          isLoaded ? 'transform translate-y-0 opacity-100' : 'transform translate-y-8 opacity-0'
        }`}>
          <div className="flex justify-center mb-6">
            <div className="relative bg-church-blue-500 rounded-full p-4 shadow-xl">
              <Receipt className="w-8 h-8 text-white" />
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-church-gold-500 rounded-full flex items-center justify-center animate-pulse">
                <CheckCircle className="w-3 h-3 text-white" />
              </div>
              <div className="absolute -bottom-1 -left-1 w-5 h-5 bg-church-red-500 rounded-full flex items-center justify-center">
                <Send className="w-2 h-2 text-white" />
              </div>
            </div>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-church-blue-900">
            Reportar
            <span className="text-church-blue-500 ml-2">Pagamento</span>
          </h2>
          
          <p className="text-lg text-church-blue-600 max-w-2xl mx-auto leading-relaxed">
            Confirme sua doação preenchendo os dados abaixo para que possamos registrar sua contribuição
          </p>

          {/* Stats do formulário */}
          <div className={`flex justify-center items-center space-x-8 mt-8 transition-all duration-1000 ease-out delay-300 ${
            isLoaded ? 'transform translate-y-0 opacity-100' : 'transform translate-y-8 opacity-0'
          }`}>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-2 rounded-lg flex items-center justify-center bg-church-blue-200">
                <User className="w-6 h-6 text-church-blue-600" />
              </div>
              <p className="text-sm font-medium text-church-blue-600">
                Identificação
              </p>
            </div>

            <div className="w-px h-12 bg-church-gold-300"></div>

            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-2 rounded-lg flex items-center justify-center bg-church-gold-200">
                <DollarSign className="w-6 h-6 text-church-gold-600" />
              </div>
              <p className="text-sm font-medium text-church-blue-600">
                Valor
              </p>
            </div>

            <div className="w-px h-12 bg-church-gold-300"></div>

            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-2 rounded-lg flex items-center justify-center bg-church-red-200">
                <MessageCircle className="w-6 h-6 text-church-red-600" />
              </div>
              <p className="text-sm font-medium text-church-blue-600">
                Comentário
              </p>
            </div>
          </div>
        </div>

        {/* Formulário */}
        <div className={`max-w-2xl mx-auto transition-all duration-1000 ease-out delay-500 ${
          isLoaded ? 'transform translate-y-0 opacity-100' : 'transform translate-y-12 opacity-0'
        }`}>
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 md:p-12 border border-church-sky-200 relative overflow-hidden">
            {/* Linha decorativa superior */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-church-blue-400 via-church-gold-400 to-church-blue-400"></div>
            
            <form
              className="space-y-6"
              onSubmit={handleSubmit(onSubmit)}
            >
              {/* Campo Nome */}
              <div className="relative">
                <label
                  htmlFor="nome"
                  className="block text-sm font-semibold text-church-blue-900 mb-2 flex items-center"
                >
                  <div className={`w-6 h-6 rounded-lg flex items-center justify-center mr-2 ${
                    focusedField === 'nome' ? 'bg-church-blue-500' : 'bg-church-blue-200'
                  } transition-colors duration-300`}>
                    <User className={`w-3 h-3 ${
                      focusedField === 'nome' ? 'text-white' : 'text-church-blue-600'
                    }`} />
                  </div>
                  Nome Completo *
                </label>
                <Controller
                  control={control}
                  name="nome"
                  render={({ field }) => (
                    <div className="relative">
                      <Input
                        id="nome"
                        type="text"
                        placeholder="Seu nome completo"
                        value={field.value}
                        onChange={field.onChange}
                        onFocus={() => setFocusedField('nome')}
                        onBlur={() => setFocusedField(null)}
                        className={`h-12 pl-4 pr-4 rounded-lg border-2 transition-all duration-300 ${
                          errors.nome 
                            ? "border-church-red-500 bg-church-red-50" 
                            : focusedField === 'nome'
                              ? "border-church-blue-500 bg-church-blue-50"
                              : "border-church-sky-200 hover:border-church-blue-300"
                        }`}
                      />
                      {errors.nome && (
                        <p className="text-church-red-500 text-sm mt-2 flex items-center">
                          <span className="w-4 h-4 rounded-full bg-church-red-500 text-white text-xs flex items-center justify-center mr-2">!</span>
                          {errors.nome.message}
                        </p>
                      )}
                    </div>
                  )}
                />
              </div>

              {/* Campo Monto */}
              <div className="relative">
                <label
                  htmlFor="monto"
                  className="block text-sm font-semibold text-church-blue-900 mb-2 flex items-center"
                >
                  <div className={`w-6 h-6 rounded-lg flex items-center justify-center mr-2 ${
                    focusedField === 'monto' ? 'bg-church-gold-500' : 'bg-church-gold-200'
                  } transition-colors duration-300`}>
                    <DollarSign className={`w-3 h-3 ${
                      focusedField === 'monto' ? 'text-white' : 'text-church-gold-600'
                    }`} />
                  </div>
                  Valor da Doação *
                </label>
                <Controller
                  control={control}
                  name="monto"
                  render={({ field }) => (
                    <div className="relative">
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-church-blue-600 font-medium">
                          R$
                        </span>
                        <Input
                          id="monto"
                          type="text"
                          inputMode="decimal"
                          placeholder="0,00"
                          value={field.value || ""}
                          onChange={(e) => {
                            // Solo permitir números, punto y coma
                            const value = e.target.value.replace(/[^0-9.,]/g, '');
                            field.onChange(value);
                          }}
                          onFocus={() => setFocusedField('monto')}
                          onBlur={() => setFocusedField(null)}
                          className={`h-12 pl-10 pr-4 rounded-lg border-2 transition-all duration-300 ${
                            errors.monto 
                              ? "border-church-red-500 bg-church-red-50" 
                              : focusedField === 'monto'
                                ? "border-church-gold-500 bg-church-gold-50"
                                : "border-church-sky-200 hover:border-church-gold-300"
                          }`}
                        />
                      </div>
                      {errors.monto && (
                        <p className="text-church-red-500 text-sm mt-2 flex items-center">
                          <span className="w-4 h-4 rounded-full bg-church-red-500 text-white text-xs flex items-center justify-center mr-2">!</span>
                          {errors.monto.message}
                        </p>
                      )}
                    </div>
                  )}
                />
              </div>

              {/* Campo Comentário */}
              <div className="relative">
                <label
                  htmlFor="comentario"
                  className="block text-sm font-semibold text-church-blue-900 mb-2 flex items-center"
                >
                  <div className={`w-6 h-6 rounded-lg flex items-center justify-center mr-2 ${
                    focusedField === 'comentario' ? 'bg-church-red-500' : 'bg-church-red-200'
                  } transition-colors duration-300`}>
                    <MessageCircle className={`w-3 h-3 ${
                      focusedField === 'comentario' ? 'text-white' : 'text-church-red-600'
                    }`} />
                  </div>
                  Comentário (opcional)
                </label>
                <Controller
                  control={control}
                  name="comentario"
                  render={({ field }) => (
                    <div className="relative">
                      <Textarea
                        id="comentario"
                        placeholder="Deixe uma mensagem sobre sua doação (opcional)..."
                        rows={4}
                        value={field.value}
                        onChange={field.onChange}
                        onFocus={() => setFocusedField('comentario')}
                        onBlur={() => setFocusedField(null)}
                        className={`resize-none p-4 rounded-lg border-2 transition-all duration-300 ${
                          errors.comentario 
                            ? "border-church-red-500 bg-church-red-50" 
                            : focusedField === 'comentario'
                              ? "border-church-red-500 bg-church-red-50"
                              : "border-church-sky-200 hover:border-church-red-300"
                        }`}
                      />
                      {errors.comentario && (
                        <p className="text-church-red-500 text-sm mt-2 flex items-center">
                          <span className="w-4 h-4 rounded-full bg-church-red-500 text-white text-xs flex items-center justify-center mr-2">!</span>
                          {errors.comentario.message}
                        </p>
                      )}
                    </div>
                  )}
                />
              </div>

              {/* Botão de envio */}
              <div className="pt-6">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full h-14 text-lg font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl bg-church-gold-500 hover:bg-church-gold-600 text-white ${
                    isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                  }`}
                >
                  <div className="flex items-center justify-center space-x-2">
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Enviando...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Confirmar Doação</span>
                      </>
                    )}
                  </div>
                </Button>
              </div>
            </form>

            {/* Informação adicional */}
            <div className="mt-8 pt-6 border-t border-church-sky-200 text-center text-church-blue-600">
              <p className="text-sm">
                🙏 Obrigado por sua generosidade • Sua doação será registrada e confirmada em breve
              </p>
            </div>
          </div>
        </div>

        {/* Informações adicionais */}
        <div className={`text-center mt-12 transition-all duration-1000 ease-out delay-700 ${
          isLoaded ? 'transform translate-y-0 opacity-100' : 'transform translate-y-8 opacity-0'
        }`}>
          <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-church-sky-200">
              <div className="w-12 h-12 bg-church-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-6 h-6 text-church-blue-600" />
              </div>
              <h3 className="font-semibold text-church-blue-900 mb-2">Segurança</h3>
              <p className="text-sm text-church-blue-600">
                Suas informações são protegidas e usadas apenas para registro da doação
              </p>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-church-sky-200">
              <div className="w-12 h-12 bg-church-gold-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-6 h-6 text-church-gold-600" />
              </div>
              <h3 className="font-semibold text-church-blue-900 mb-2">Transparência</h3>
              <p className="text-sm text-church-blue-600">
                Todos os recursos são usados para a obra de Deus e crescimento da igreja
              </p>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-church-sky-200">
              <div className="w-12 h-12 bg-church-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Receipt className="w-6 h-6 text-church-red-600" />
              </div>
              <h3 className="font-semibold text-church-blue-900 mb-2">Registro</h3>
              <p className="text-sm text-church-blue-600">
                Sua doação será registrada em nosso sistema e nossa equipe será notificada
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};