"use client";
import React, { useState, useEffect } from "react";
import { Book, Heart, Star, Sparkles, Quote } from "lucide-react";
import { BackgroundVariantProps, getVariantClasses } from "@/lib/styles";


// Versículos rotativos para variedad
const versiculos = [
  {
    texto: "Pois Deus amou o mundo de tal maneira que deu o seu único Filho, para que todo aquele que nele crê não morra, mas tenha a vida eterna.",
    referencia: "João 3:16",
    tema: "Amor de Deus",
    emoji: "💝"
  },
  {
    texto: "Posso todas as coisas naquele que me fortalece.",
    referencia: "Filipenses 4:13",
    tema: "Força",
    emoji: "💪"
  },
  {
    texto: "O SENHOR é o meu pastor; nada me faltará.",
    referencia: "Salmos 23:1",
    tema: "Proteção",
    emoji: "🐑"
  },
  {
    texto: "Entregue o seu caminho ao SENHOR; confie nele, e ele agirá.",
    referencia: "Salmos 37:5",
    tema: "Confiança",
    emoji: "🙏"
  },
  {
    texto: "Porque para Deus nada é impossível.",
    referencia: "Lucas 1:37",
    tema: "Fé",
    emoji: "✨"
  }
];

interface VersiculoDelDiaProps extends BackgroundVariantProps {
  versiculoIndex?: number; // Para controlar manualmente qué versículo mostrar
  showRotation?: boolean; // Para activar/desactivar rotación automática
}

export const VersiculoDelDia = ({ 
  backgroundVariant = 'dark',
  versiculoIndex = 0,
  showRotation = false
}: VersiculoDelDiaProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentVersiculoIndex, setCurrentVersiculoIndex] = useState(versiculoIndex);
  const [isAnimating, setIsAnimating] = useState(false);

  const { background, text, subtext, isDark, overlay } = getVariantClasses(backgroundVariant);
  const versiculo = versiculos[currentVersiculoIndex];

  useEffect(() => {
    setIsLoaded(true);
    
    if (showRotation) {
      const interval = setInterval(() => {
        setIsAnimating(true);
        setTimeout(() => {
          setCurrentVersiculoIndex((prev) => (prev + 1) % versiculos.length);
          setIsAnimating(false);
        }, 500);
      }, 10000); // Cambia cada 10 segundos

      return () => clearInterval(interval);
    }
  }, [showRotation]);

  return (
    <section className={`py-20 ${background} relative overflow-hidden`}>
      {/* Decoración de fondo animada */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-church-gold-400 rounded-full animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 bg-church-blue-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-church-red-400 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/4 right-1/4 w-20 h-20 bg-church-sky-400 rounded-full animate-pulse" style={{ animationDelay: '3s' }}></div>
      </div>

      {/* Pattern de fondo sutil */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, ${isDark ? 'white' : '#1e40af'} 1px, transparent 0)`,
        backgroundSize: '20px 20px'
      }}></div>

      <div className="container mx-auto px-4 text-center relative z-10">
        {/* Header animado */}
        <div className={`mb-12 transition-all duration-1000 ease-out ${
          isLoaded ? 'transform translate-y-0 opacity-100' : 'transform translate-y-8 opacity-0'
        }`}>
          {/* Ícono principal */}
          <div className="flex justify-center mb-6">
            <div className="relative bg-church-gold-500 rounded-full p-4 shadow-2xl">
              <Book className="w-10 h-10 text-white" />
              {/* Decoraciones flotantes */}
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-church-red-500 rounded-full flex items-center justify-center animate-bounce">
                <Heart className="w-4 h-4 text-white" />
              </div>
              <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-church-blue-500 rounded-full flex items-center justify-center">
                <Star className="w-3 h-3 text-white" />
              </div>
              <div className="absolute top-0 left-0 w-full h-full bg-church-gold-400 rounded-full animate-ping opacity-75"></div>
            </div>
          </div>

          <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${text}`}>
            <span className="text-church-gold-400">Versículo</span> do Dia
          </h2>
          
          {/* Badge del tema */}
          <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full ${overlay} backdrop-blur-sm`}>
            <span className="text-2xl">{versiculo.emoji}</span>
            <span className={`text-sm font-medium ${subtext}`}>
              {versiculo.tema}
            </span>
          </div>
        </div>

        {/* Contenido del versículo */}
        <div className={`max-w-4xl mx-auto transition-all duration-1000 ease-out delay-300 ${
          isLoaded ? 'transform translate-y-0 opacity-100' : 'transform translate-y-12 opacity-0'
        }`}>
          {/* Quote decorativo */}
          <div className="relative mb-8">
            <div className="absolute -top-4 -left-4 w-16 h-16 text-church-gold-400 opacity-50">
              <Quote className="w-full h-full" />
            </div>
            
            <blockquote className={`text-2xl md:text-3xl lg:text-4xl font-light leading-relaxed italic ${text} transition-all duration-500 ${
              isAnimating ? 'opacity-0 transform translate-y-4' : 'opacity-100 transform translate-y-0'
            }`}
            style={{ textShadow: isDark ? '2px 2px 4px rgba(0,0,0,0.3)' : 'none' }}
            >
              "{versiculo.texto}"
            </blockquote>
            
            <div className="absolute -bottom-4 -right-4 w-16 h-16 text-church-gold-400 opacity-50 transform rotate-180">
              <Quote className="w-full h-full" />
            </div>
          </div>

          {/* Referencia bíblica */}
          <div className={`transition-all duration-500 delay-200 ${
            isAnimating ? 'opacity-0 transform translate-y-4' : 'opacity-100 transform translate-y-0'
          }`}>
            <cite className={`inline-flex items-center space-x-3 px-6 py-4 rounded-xl ${
              isDark 
                ? 'bg-church-blue-700/50 border border-church-blue-600' 
                : 'bg-white/80 border border-church-gold-200'
            } backdrop-blur-sm shadow-lg not-italic`}>
              <div className="w-8 h-8 bg-church-gold-500 rounded-full flex items-center justify-center">
                <Book className="w-4 h-4 text-white" />
              </div>
              <span className={`text-xl md:text-2xl font-semibold ${
                isDark ? 'text-church-gold-300' : 'text-church-blue-800'
              }`}>
                — {versiculo.referencia}
              </span>
            </cite>
          </div>
        </div>

        {/* Elementos decorativos adicionales */}
        <div className={`mt-16 transition-all duration-1000 ease-out delay-500 ${
          isLoaded ? 'transform translate-y-0 opacity-100' : 'transform translate-y-8 opacity-0'
        }`}>
          <div className="flex justify-center items-center space-x-8">
            <div className="flex items-center space-x-2">
              <Sparkles className={`w-5 h-5 ${
                isDark ? 'text-church-gold-400' : 'text-church-blue-500'
              }`} />
              <span className={`text-sm ${subtext}`}>
                Palavra Viva
              </span>
            </div>

            <div className="w-px h-8 bg-church-gold-300"></div>

            <div className="flex items-center space-x-2">
              <Heart className={`w-5 h-5 ${
                isDark ? 'text-church-red-400' : 'text-church-red-500'
              }`} />
              <span className={`text-sm ${subtext}`}>
                Para Sua Vida
              </span>
            </div>

            <div className="w-px h-8 bg-church-gold-300"></div>

            <div className="flex items-center space-x-2">
              <Star className={`w-5 h-5 ${
                isDark ? 'text-church-sky-400' : 'text-church-blue-500'
              }`} />
              <span className={`text-sm ${subtext}`}>
                Cada Dia
              </span>
            </div>
          </div>
        </div>

        {/* Indicadores de versículos (si hay rotación) */}
        {showRotation && (
          <div className="mt-12 flex justify-center space-x-2">
            {versiculos.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentVersiculoIndex 
                    ? "bg-church-gold-500 scale-125 shadow-lg shadow-church-gold-500/50" 
                    : isDark 
                      ? "bg-church-blue-400 hover:bg-church-gold-400" 
                      : "bg-church-sky-300 hover:bg-church-gold-400"
                }`}
                onClick={() => {
                  setIsAnimating(true);
                  setTimeout(() => {
                    setCurrentVersiculoIndex(index);
                    setIsAnimating(false);
                  }, 250);
                }}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};