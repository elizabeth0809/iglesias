"use client";

import { ImageCarousel } from "@/app/components/ImageCarousel";
import React, { useState, useEffect } from "react";
import { Camera, Heart, Users } from "lucide-react";

// Tipos de background que puedes usar
type BackgroundVariant = 'light' | 'dark' | 'gradient' | 'white';

interface CarruselImagenComponentsProps {
  backgroundVariant?: BackgroundVariant;
}

const backgroundClasses: Record<BackgroundVariant, string> = {
  light: 'bg-gradient-to-br from-church-sky-50 via-white to-church-blue-50',
  dark: 'bg-gradient-to-br from-church-blue-800 to-church-blue-900',
  gradient: 'bg-gradient-to-br from-church-gold-100 via-church-sky-50 to-church-blue-100',
  white: 'bg-white'
};

const textClasses: Record<BackgroundVariant, string> = {
  light: 'text-church-blue-900',
  dark: 'text-white',
  gradient: 'text-church-blue-900',
  white: 'text-church-blue-900'
};

const subtextClasses: Record<BackgroundVariant, string> = {
  light: 'text-church-blue-600',
  dark: 'text-church-sky-200',
  gradient: 'text-church-blue-700',
  white: 'text-church-blue-600'
};

export const CarruselImagenComponents = ({ 
  backgroundVariant = 'gradient' 
}: CarruselImagenComponentsProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const isDark = backgroundVariant === 'dark';

  return (
    <section className={`py-20 ${backgroundClasses[backgroundVariant]}`}>
      <div className="container mx-auto px-4">
        {/* Header mejorado */}
        <div className={`text-center mb-16 transition-all duration-1000 ease-out ${
          isLoaded ? 'transform translate-y-0 opacity-100' : 'transform translate-y-8 opacity-0'
        }`}>
          {/* Ícono decorativo */}
          <div className="flex justify-center mb-6">
            <div className={`relative ${
              isDark 
                ? 'bg-church-gold-500' 
                : 'bg-church-gold-500'
            } rounded-full p-4 shadow-lg`}>
              <Camera className="w-8 h-8 text-white" />
              {/* Decoración flotante */}
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-church-red-500 rounded-full flex items-center justify-center">
                <Heart className="w-3 h-3 text-white" />
              </div>
            </div>
          </div>

          <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${textClasses[backgroundVariant]}`}>
            Um Olhar Sobre Nossa
            <br />
            <span className="text-church-gold-500">Comunidade</span>
          </h2>
          
          <p className={`text-lg md:text-xl max-w-2xl mx-auto leading-relaxed ${subtextClasses[backgroundVariant]}`}>
            Momentos especiais que refletem o amor, a união e a fé que compartilhamos como família de Deus
          </p>

          {/* Stats decorativos */}
          <div className={`flex justify-center items-center space-x-8 mt-8 transition-all duration-1000 ease-out delay-300 ${
            isLoaded ? 'transform translate-y-0 opacity-100' : 'transform translate-y-8 opacity-0'
          }`}>
            <div className="text-center">
              <div className={`w-12 h-12 mx-auto mb-2 rounded-lg flex items-center justify-center ${
                isDark ? 'bg-church-sky-600' : 'bg-church-sky-200'
              }`}>
                <Users className={`w-6 h-6 ${
                  isDark ? 'text-white' : 'text-church-blue-600'
                }`} />
              </div>
              <p className={`text-sm font-medium ${subtextClasses[backgroundVariant]}`}>
                Nossa Família
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
              <p className={`text-sm font-medium ${subtextClasses[backgroundVariant]}`}>
                Momentos de Fé
              </p>
            </div>

            <div className="w-px h-12 bg-church-gold-300"></div>

            <div className="text-center">
              <div className={`w-12 h-12 mx-auto mb-2 rounded-lg flex items-center justify-center ${
                isDark ? 'bg-church-red-600' : 'bg-church-red-200'
              }`}>
                <Camera className={`w-6 h-6 ${
                  isDark ? 'text-white' : 'text-church-red-600'
                }`} />
              </div>
              <p className={`text-sm font-medium ${subtextClasses[backgroundVariant]}`}>
                Memórias Eternas
              </p>
            </div>
          </div>
        </div>

        {/* Carousel con animación de entrada */}
        <div className={`transition-all duration-1000 ease-out delay-500 ${
          isLoaded ? 'transform translate-y-0 opacity-100' : 'transform translate-y-12 opacity-0'
        }`}>
          <ImageCarousel backgroundVariant={backgroundVariant} />
        </div>

        {/* Call to action sutil */}
        <div className={`text-center mt-12 transition-all duration-1000 ease-out delay-700 ${
          isLoaded ? 'transform translate-y-0 opacity-100' : 'transform translate-y-8 opacity-0'
        }`}>
          <p className={`text-sm ${subtextClasses[backgroundVariant]} italic`}>
            &ldquo;Cada imagem conta uma história de fé, amor e comunhão&rdquo;
          </p>
        </div>
      </div>
    </section>
  );
};