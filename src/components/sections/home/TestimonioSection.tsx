"use client";
import { TestimonialCarousel } from "@/app/components/TestimonialCarousel";
import React, { useState, useEffect } from "react";
import { Quote, Heart, Star, Users } from "lucide-react";
import { BackgroundVariantProps, getVariantClasses } from "@/lib/styles";

export const TestimonioSection = ({ 
  backgroundVariant = 'light' 
}: BackgroundVariantProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { background, text, subtext, isDark, overlay } = getVariantClasses(backgroundVariant);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className={`py-20 ${background} relative overflow-hidden`}>
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-church-gold-400 rounded-full"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-church-blue-400 rounded-full"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-church-red-400 rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header mejorado */}
        <div className={`text-center mb-16 transition-all duration-1000 ease-out ${
          isLoaded ? 'transform translate-y-0 opacity-100' : 'transform translate-y-8 opacity-0'
        }`}>
          {/* Ícono principal */}
          <div className="flex justify-center mb-6">
            <div className="relative bg-church-gold-500 rounded-full p-4 shadow-xl">
              <Quote className="w-8 h-8 text-white" />
              {/* Decoraciones flotantes */}
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-church-red-500 rounded-full flex items-center justify-center animate-pulse">
                <Heart className="w-3 h-3 text-white" />
              </div>
              <div className="absolute -bottom-1 -left-1 w-5 h-5 bg-church-blue-500 rounded-full flex items-center justify-center">
                <Star className="w-2 h-2 text-white" />
              </div>
            </div>
          </div>

          <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${text}`}>
            Testemunhos de
            <br />
            <span className="text-church-gold-500">Nossa Família</span>
          </h2>
          
          <p className={`text-lg md:text-xl max-w-3xl mx-auto leading-relaxed ${subtext}`}>
            Histórias reais de transformação, fé e amor que inspiram nossa jornada espiritual
          </p>

          {/* Stats inspiracionais */}
          <div className={`flex justify-center items-center space-x-8 mt-8 transition-all duration-1000 ease-out delay-300 ${
            isLoaded ? 'transform translate-y-0 opacity-100' : 'transform translate-y-8 opacity-0'
          }`}>
            <div className="text-center">
              <div className={`text-2xl md:text-3xl font-bold ${text} mb-1`}>
                60+
              </div>
              <p className={`text-sm ${subtext}`}>
                Vidas Transformadas
              </p>
            </div>

            <div className="w-px h-12 bg-church-gold-300"></div>

            <div className="text-center">
              <div className={`text-2xl md:text-3xl font-bold ${text} mb-1`}>
                17
              </div>
              <p className={`text-sm ${subtext}`}>
                Anos de Ministério
              </p>
            </div>

            <div className="w-px h-12 bg-church-gold-300"></div>

            <div className="text-center">
              <div className={`text-2xl md:text-3xl font-bold ${text} mb-1`}>
                100%
              </div>
              <p className={`text-sm ${subtext}`}>
                Amor e Dedicação
              </p>
            </div>
          </div>
        </div>

        {/* Carousel con animación */}
        <div className={`transition-all duration-1000 ease-out delay-500 ${
          isLoaded ? 'transform translate-y-0 opacity-100' : 'transform translate-y-12 opacity-0'
        }`}>
          <TestimonialCarousel backgroundVariant={backgroundVariant} />
        </div>

        {/* Call to action */}
        <div className={`text-center mt-16 transition-all duration-1000 ease-out delay-700 ${
          isLoaded ? 'transform translate-y-0 opacity-100' : 'transform translate-y-8 opacity-0'
        }`}>
          <div className={`inline-flex items-center space-x-2 px-6 py-3 rounded-full ${overlay}`}>
            <Users className={`w-5 h-5 ${
              isDark ? 'text-church-sky-300' : 'text-church-blue-600'
            }`} />
            <p className={`text-sm font-medium ${subtext}`}>
              Faça parte desta família de fé
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};