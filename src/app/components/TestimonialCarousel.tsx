"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Quote, Star, Heart } from "lucide-react";

const testimonials = [
  {
    quote: "Esta igreja transformou a minha vida. Encontrei uma comunidade acolhedora e um propósito maior. Cada domingo sinto o amor de Deus através dos irmãos.",
    author: "Maria González",
    role: "Membro desde 2018",
    rating: 5,
    highlight: "Comunidade acolhedora"
  },
  {
    quote: "Os sermões são inspiradores e relevantes para o meu dia a dia. Sinto-me renovado a cada semana e minha fé cresceu enormemente.",
    author: "Juan Pérez", 
    role: "Membro desde 2020",
    rating: 5,
    highlight: "Sermões inspiradores"
  },
  {
    quote: "O programa juvenil tem sido uma bênção para os meus filhos. Eles cresceram muito na sua fé e encontraram amigos verdadeiros.",
    author: "Ana Rodríguez",
    role: "Mãe e membro desde 2015", 
    rating: 5,
    highlight: "Programa juvenil"
  },
  {
    quote: "A música e adoração aqui tocam profundamente meu coração. É um lugar onde posso expressar minha gratidão a Deus livremente.",
    author: "Carlos Silva",
    role: "Membro desde 2019",
    rating: 5,
    highlight: "Adoração tocante"
  }
];

type BackgroundVariant = 'light' | 'dark' | 'gradient' | 'white';

interface TestimonialCarouselProps {
  backgroundVariant?: BackgroundVariant;
}

export function TestimonialCarousel({ backgroundVariant = 'light' }: TestimonialCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const isDark = backgroundVariant === 'dark';

  // Usar useCallback para estabilizar la función nextTestimonial
  const nextTestimonial = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating]);

  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 6000); // Auto-advance cada 6 segundos

    return () => clearInterval(interval);
  }, [nextTestimonial]);

  const prevTestimonial = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length
    );
    setTimeout(() => setIsAnimating(false), 500);
  };

  const goToTestimonial = (index: number) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <div className="relative max-w-4xl mx-auto">
      {/* Card principal */}
      <Card className={`relative overflow-hidden shadow-2xl border-0 ${
        isDark 
          ? 'bg-church-blue-800/80 backdrop-blur-sm' 
          : 'bg-white/90 backdrop-blur-sm'
      }`}>
        {/* Decoración superior */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-church-gold-400 via-church-blue-400 to-church-gold-400"></div>
        
        <CardContent className="p-8 md:p-12">
          {/* Quote icon decorativo */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="w-16 h-16 bg-church-gold-500 rounded-full flex items-center justify-center shadow-lg">
                <Quote className="w-8 h-8 text-white" />
              </div>
              {/* Decoración flotante */}
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-church-red-500 rounded-full flex items-center justify-center">
                <Heart className="w-3 h-3 text-white" />
              </div>
            </div>
          </div>

          {/* Highlight badge */}
          <div className="flex justify-center mb-6">
            <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
              isDark 
                ? 'bg-church-gold-600 text-white' 
                : 'bg-church-gold-100 text-church-gold-700'
            }`}>
              ✨ {currentTestimonial.highlight}
            </span>
          </div>

          {/* Rating stars */}
          <div className="flex justify-center mb-6">
            {[...Array(currentTestimonial.rating)].map((_, i) => (
              <Star 
                key={i} 
                className="w-5 h-5 text-church-gold-500 fill-current" 
              />
            ))}
          </div>

          {/* Quote text */}
          <blockquote className={`text-xl md:text-2xl italic leading-relaxed text-center mb-8 transition-all duration-500 ${
            isDark ? 'text-church-sky-100' : 'text-church-blue-800'
          } ${isAnimating ? 'opacity-0 transform translate-y-4' : 'opacity-100 transform translate-y-0'}`}>
            &ldquo;{currentTestimonial.quote}&rdquo;
          </blockquote>

          {/* Author info */}
          <div className={`text-center transition-all duration-500 delay-200 ${
            isAnimating ? 'opacity-0 transform translate-y-4' : 'opacity-100 transform translate-y-0'
          }`}>
            <div className={`inline-flex items-center space-x-4 px-6 py-4 rounded-xl ${
              isDark 
                ? 'bg-church-blue-700/50 border border-church-blue-600' 
                : 'bg-church-sky-50 border border-church-sky-200'
            }`}>
              <div className="w-12 h-12 bg-church-gold-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">
                  {currentTestimonial.author.charAt(0)}
                </span>
              </div>
              <div className="text-left">
                <cite className={`font-semibold ${
                  isDark ? 'text-white' : 'text-church-blue-900'
                } not-italic`}>
                  {currentTestimonial.author}
                </cite>
                <p className={`text-sm ${
                  isDark ? 'text-church-sky-300' : 'text-church-blue-600'
                }`}>
                  {currentTestimonial.role}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Botones de navegación */}
      <Button
        variant="outline"
        size="icon"
        className={`absolute top-1/2 -left-6 transform -translate-y-1/2 transition-all duration-300 shadow-xl ${
          isDark 
            ? 'bg-church-blue-800/90 hover:bg-church-gold-500 border-church-blue-600 text-white hover:text-white backdrop-blur-sm' 
            : 'bg-white/90 hover:bg-church-gold-500 hover:text-white border-church-gold-300 backdrop-blur-sm'
        }`}
        onClick={prevTestimonial}
        disabled={isAnimating}
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        className={`absolute top-1/2 -right-6 transform -translate-y-1/2 transition-all duration-300 shadow-xl ${
          isDark 
            ? 'bg-church-blue-800/90 hover:bg-church-gold-500 border-church-blue-600 text-white hover:text-white backdrop-blur-sm' 
            : 'bg-white/90 hover:bg-church-gold-500 hover:text-white border-church-gold-300 backdrop-blur-sm'
        }`}
        onClick={nextTestimonial}
        disabled={isAnimating}
      >
        <ChevronRight className="h-5 w-5" />
      </Button>

      {/* Indicadores */}
      <div className="flex justify-center mt-8 space-x-3">
        {testimonials.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? "bg-church-gold-500 scale-125 shadow-lg shadow-church-gold-500/50" 
                : isDark 
                  ? "bg-church-blue-400 hover:bg-church-gold-400" 
                  : "bg-church-sky-300 hover:bg-church-gold-400"
            }`}
            onClick={() => goToTestimonial(index)}
            disabled={isAnimating}
          />
        ))}
      </div>

      {/* Progress bar */}
      <div className={`mt-4 w-full h-1 rounded-full overflow-hidden ${
        isDark ? 'bg-church-blue-700' : 'bg-church-sky-200'
      }`}>
        <div 
          className="h-full bg-church-gold-500 transition-all duration-75 ease-linear"
          style={{
            width: `${((currentIndex + 1) / testimonials.length) * 100}%`
          }}
        />
      </div>
    </div>
  );
}