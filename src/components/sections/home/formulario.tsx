"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Controller } from "react-hook-form";
import React, { useState, useEffect } from "react";
import { useContactForm } from "@/hooks/useContactForm.hooks";
import { Mail, MessageCircle, User, Send, Heart, Phone, CheckCircle } from "lucide-react";
import { BackgroundVariantProps, getVariantClasses } from "@/lib/styles";

// Arreglamos la interface vacía agregando una propiedad opcional o usando type
type FormularioComponentProps = BackgroundVariantProps;

export const FormularioComponent = ({ 
  backgroundVariant = 'light' 
}: FormularioComponentProps) => {
  const { control, errors, isSubmitting, handleSubmit, onSubmit } = useContactForm();
  const [isLoaded, setIsLoaded] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const { background, text, subtext, isDark, buttons, card, overlay } = getVariantClasses(backgroundVariant);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className={`py-20 ${background} relative overflow-hidden`}>
      {/* Decoração de fundo */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-church-blue-400 rounded-full"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-church-gold-400 rounded-full"></div>
        <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-church-red-400 rounded-full"></div>
        <div className="absolute top-1/4 left-1/4 w-20 h-20 bg-church-sky-400 rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header mejorado */}
        <div className={`text-center mb-16 transition-all duration-1000 ease-out ${
          isLoaded ? 'transform translate-y-0 opacity-100' : 'transform translate-y-8 opacity-0'
        }`}>
          {/* Ícono principal */}
          <div className="flex justify-center mb-6">
            <div className="relative bg-church-blue-500 rounded-full p-4 shadow-xl">
              <Mail className="w-8 h-8 text-white" />
              {/* Decorações flotantes */}
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-church-gold-500 rounded-full flex items-center justify-center animate-pulse">
                <Heart className="w-3 h-3 text-white" />
              </div>
              <div className="absolute -bottom-1 -left-1 w-5 h-5 bg-church-red-500 rounded-full flex items-center justify-center">
                <MessageCircle className="w-2 h-2 text-white" />
              </div>
            </div>
          </div>

          <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${text}`}>
            Fale
            <span className="text-church-blue-500 ml-2">Conosco</span>
          </h2>
          
          <p className={`text-lg md:text-xl max-w-3xl mx-auto leading-relaxed ${subtext}`}>
            Estamos aqui para ouvir você. Compartilhe suas dúvidas, pedidos de oração ou como podemos ajudar
          </p>

          {/* Stats de contato */}
          <div className={`flex justify-center items-center space-x-8 mt-8 transition-all duration-1000 ease-out delay-300 ${
            isLoaded ? 'transform translate-y-0 opacity-100' : 'transform translate-y-8 opacity-0'
          }`}>
            <div className="text-center">
              <div className={`w-12 h-12 mx-auto mb-2 rounded-lg flex items-center justify-center ${
                isDark ? 'bg-church-blue-600' : 'bg-church-blue-200'
              }`}>
                <MessageCircle className={`w-6 h-6 ${
                  isDark ? 'text-white' : 'text-church-blue-600'
                }`} />
              </div>
              <p className={`text-sm font-medium ${subtext}`}>
                Resposta Rápida
              </p>
            </div>

            <div className="w-px h-12 bg-church-gold-300"></div>

            <div className="text-center">
              <div className={`w-12 h-12 mx-auto mb-2 rounded-lg flex items-center justify-center ${
                isDark ? 'bg-church-gold-600' : 'bg-church-gold-200'
              }`}>
                <Heart className={`w-6 h-6 ${
                  isDark ? 'text-white' : 'text-church-gold-600'
                }`} />
              </div>
              <p className={`text-sm font-medium ${subtext}`}>
                Atendimento Carinhoso
              </p>
            </div>

            <div className="w-px h-12 bg-church-gold-300"></div>

            <div className="text-center">
              <div className={`w-12 h-12 mx-auto mb-2 rounded-lg flex items-center justify-center ${
                isDark ? 'bg-church-red-600' : 'bg-church-red-200'
              }`}>
                <CheckCircle className={`w-6 h-6 ${
                  isDark ? 'text-white' : 'text-church-red-600'
                }`} />
              </div>
              <p className={`text-sm font-medium ${subtext}`}>
                Sempre Disponível
              </p>
            </div>
          </div>
        </div>

        {/* Formulário melhorado */}
        <div className={`max-w-2xl mx-auto transition-all duration-1000 ease-out delay-500 ${
          isLoaded ? 'transform translate-y-0 opacity-100' : 'transform translate-y-12 opacity-0'
        }`}>
          <div className={`${card} rounded-2xl shadow-2xl p-8 md:p-12 border relative overflow-hidden`}>
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
                  className={`block text-sm font-semibold ${text} mb-2 flex items-center`}
                >
                  <div className={`w-6 h-6 rounded-lg flex items-center justify-center mr-2 ${
                    focusedField === 'nome' ? 'bg-church-blue-500' : 'bg-church-blue-200'
                  } transition-colors duration-300`}>
                    <User className={`w-3 h-3 ${
                      focusedField === 'nome' ? 'text-white' : 'text-church-blue-600'
                    }`} />
                  </div>
                  Nome Completo
                </label>
                <Controller
                  control={control}
                  name="nome"
                  render={({ field }) => (
                    <div className="relative">
                      <Input
                        id="nome"
                        type="text"
                        placeholder="Como você gostaria de ser chamado?"
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

              {/* Campo WhatsApp */}
              <div className="relative">
                <label
                  htmlFor="whatsapp"
                  className={`block text-sm font-semibold ${text} mb-2 flex items-center`}
                >
                  <div className={`w-6 h-6 rounded-lg flex items-center justify-center mr-2 ${
                    focusedField === 'whatsapp' ? 'bg-church-gold-500' : 'bg-church-gold-200'
                  } transition-colors duration-300`}>
                    <Phone className={`w-3 h-3 ${
                      focusedField === 'whatsapp' ? 'text-white' : 'text-church-gold-600'
                    }`} />
                  </div>
                  WhatsApp
                </label>
                <Controller
                  control={control}
                  name="whatsapp"
                  render={({ field }) => (
                    <div className="relative">
                      <Input
                        id="whatsapp"
                        type="tel"
                        placeholder="(11) 99999-9999"
                        value={field.value}
                        onChange={field.onChange}
                        onFocus={() => setFocusedField('whatsapp')}
                        onBlur={() => setFocusedField(null)}
                        className={`h-12 pl-4 pr-4 rounded-lg border-2 transition-all duration-300 ${
                          errors.whatsapp 
                            ? "border-church-red-500 bg-church-red-50" 
                            : focusedField === 'whatsapp'
                              ? "border-church-gold-500 bg-church-gold-50"
                              : "border-church-sky-200 hover:border-church-gold-300"
                        }`}
                      />
                      {errors.whatsapp && (
                        <p className="text-church-red-500 text-sm mt-2 flex items-center">
                          <span className="w-4 h-4 rounded-full bg-church-red-500 text-white text-xs flex items-center justify-center mr-2">!</span>
                          {errors.whatsapp.message}
                        </p>
                      )}
                    </div>
                  )}
                />
              </div>

              {/* Campo Descrição */}
              <div className="relative">
                <label
                  htmlFor="descricao"
                  className={`block text-sm font-semibold ${text} mb-2 flex items-center`}
                >
                  <div className={`w-6 h-6 rounded-lg flex items-center justify-center mr-2 ${
                    focusedField === 'descricao' ? 'bg-church-red-500' : 'bg-church-red-200'
                  } transition-colors duration-300`}>
                    <MessageCircle className={`w-3 h-3 ${
                      focusedField === 'descricao' ? 'text-white' : 'text-church-red-600'
                    }`} />
                  </div>
                  Mensagem
                </label>
                <Controller
                  control={control}
                  name="descricao"
                  render={({ field }) => (
                    <div className="relative">
                      <Textarea
                        id="descricao"
                        placeholder="Como podemos ajudar você? Compartilhe suas dúvidas, pedidos de oração ou sugestões..."
                        rows={5}
                        value={field.value}
                        onChange={field.onChange}
                        onFocus={() => setFocusedField('descricao')}
                        onBlur={() => setFocusedField(null)}
                        className={`resize-none p-4 rounded-lg border-2 transition-all duration-300 ${
                          errors.descricao 
                            ? "border-church-red-500 bg-church-red-50" 
                            : focusedField === 'descricao'
                              ? "border-church-red-500 bg-church-red-50"
                              : "border-church-sky-200 hover:border-church-red-300"
                        }`}
                      />
                      {errors.descricao && (
                        <p className="text-church-red-500 text-sm mt-2 flex items-center">
                          <span className="w-4 h-4 rounded-full bg-church-red-500 text-white text-xs flex items-center justify-center mr-2">!</span>
                          {errors.descricao.message}
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
                  className={`w-full h-14 text-lg font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl ${buttons.primary} ${
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
                        <span>Enviar Mensagem</span>
                      </>
                    )}
                  </div>
                </Button>
              </div>
            </form>

            {/* Informação adicional */}
            <div className={`mt-8 pt-6 border-t border-church-sky-200 text-center ${subtext}`}>
              <p className="text-sm">
                💝 Responderemos em até 24 horas • Todas as mensagens são tratadas com carinho e confidencialidade
              </p>
            </div>
          </div>
        </div>

        {/* Call to action final */}
        <div className={`text-center mt-12 transition-all duration-1000 ease-out delay-700 ${
          isLoaded ? 'transform translate-y-0 opacity-100' : 'transform translate-y-8 opacity-0'
        }`}>
          <div className={`inline-flex items-center space-x-2 px-6 py-3 rounded-full ${overlay}`}>
            <Heart className={`w-5 h-5 ${
              isDark ? 'text-church-gold-300' : 'text-church-red-500'
            }`} />
            <p className={`text-sm font-medium ${subtext}`}>
              &ldquo;Estamos aqui para caminhar junto com você&rdquo;
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};