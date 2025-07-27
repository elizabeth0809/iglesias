"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, CalendarIcon, Clock, MapPin, Sparkles } from "lucide-react";
import { IEventoResponse } from "@/insfractucture/interfaces/eventos/eventos.interfaces";

interface EventosCarouselProps {
  eventos: IEventoResponse[];
}

export function EventosCarousel({ eventos }: EventosCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState(3);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    
    const updateVisibleItems = () => {
      if (window.innerWidth < 768) {
        setVisibleItems(1);
      } else if (window.innerWidth < 1024) {
        setVisibleItems(2);
      } else {
        setVisibleItems(3);
      }
    };

    updateVisibleItems();
    window.addEventListener("resize", updateVisibleItems);
    return () => window.removeEventListener("resize", updateVisibleItems);
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 < eventos.length - (visibleItems - 1) ? prevIndex + 1 : 0
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - 1 >= 0 ? prevIndex - 1 : eventos.length - visibleItems
    );
  };

  if (!eventos || eventos.length === 0) {
    return (
      <section className="py-16 bg-gradient-to-br from-church-sky-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-church-gold-100 rounded-full mb-4">
              <CalendarIcon className="w-8 h-8 text-church-gold-600" />
            </div>
            <h2 className="text-3xl font-bold mb-4 text-church-blue-900">Próximos Eventos</h2>
            <p className="text-church-blue-600 text-lg">
              Nenhum evento programado no momento
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-br from-church-sky-50 via-white to-church-blue-50">
      <div className="container mx-auto px-4">
        {/* Header animado */}
        <div className={`flex justify-between items-center mb-12 transition-all duration-1000 ease-out ${
          isLoaded ? 'transform translate-y-0 opacity-100' : 'transform translate-y-8 opacity-0'
        }`}>
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-12 h-12 bg-church-gold-500 rounded-lg shadow-lg">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-4xl font-bold text-church-blue-900">Próximos Eventos</h2>
              <p className="text-church-blue-600">Participe da nossa comunidade</p>
            </div>
          </div>
          <Link 
            href="/eventos" 
            className="group relative px-6 py-3 bg-church-gold-500 text-white font-semibold rounded-lg hover:bg-church-gold-600 transition-all duration-300 hover:shadow-lg transform hover:scale-105"
          >
            <span className="relative z-10">Ver todos</span>
            <ChevronRight className="inline-block w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            <div className="absolute inset-0 bg-church-gold-600 rounded-lg transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
          </Link>
        </div>

        <div className="relative w-full overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / visibleItems)}%)`,
            }}
          >
            {eventos.map((evento, index) => (
              <Link
                href={`/eventos/${evento.slug}`}
                key={evento.id}
                className="px-3 flex-shrink-0"
                style={{ width: `${100 / visibleItems}%` }}
              >
                <div className={`block group transition-all duration-700 ease-out ${
                  isLoaded 
                    ? 'transform translate-y-0 opacity-100' 
                    : 'transform translate-y-12 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 group-hover:shadow-2xl group-hover:-translate-y-2 border border-church-sky-200 relative">
                    {/* Gradient overlay sutil */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-church-gold-400 via-church-blue-400 to-church-gold-400"></div>
                    
                    <div className="relative h-64 md:h-72 lg:h-80 overflow-hidden">
                      <Image
                        src={evento.imagem || "/placeholder.svg"}
                        alt={evento.nome}
                        fill
                        className="object-cover transition-all duration-500 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      
                      {/* Overlay gradient en la imagen */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      
                      {/* Badge de status mejorado */}
                      <div className="absolute top-4 right-4">
                        <span
                          className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold shadow-lg backdrop-blur-sm ${
                            evento.status === "ativo"
                              ? "bg-church-gold-500 text-white"
                              : "bg-gray-500 text-white"
                          }`}
                        >
                          {evento.status === 'ativo' ? '✨ Ativo' : '✅ Concluído'}
                        </span>
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-3 text-church-blue-900 group-hover:text-church-gold-600 transition-colors duration-300 line-clamp-2">
                        {evento.nome}
                      </h3>
                      
                      {/* Info com ícones coloridos */}
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-church-blue-600">
                          <div className="flex items-center justify-center w-8 h-8 bg-church-sky-100 rounded-lg mr-3">
                            <CalendarIcon className="h-4 w-4 text-church-blue-500" />
                          </div>
                          <span className="text-sm font-medium">
                            {formatDate(evento.data_inicio)}
                          </span>
                        </div>

                        <div className="flex items-center text-church-blue-600">
                          <div className="flex items-center justify-center w-8 h-8 bg-church-gold-100 rounded-lg mr-3">
                            <Clock className="h-4 w-4 text-church-gold-600" />
                          </div>
                          <span className="text-sm font-medium">
                            {formatTime(evento.data_inicio)}
                          </span>
                        </div>

                        {evento.localizacao && (
                          <div className="flex items-center text-church-blue-600">
                            <div className="flex items-center justify-center w-8 h-8 bg-church-red-100 rounded-lg mr-3">
                              <MapPin className="h-4 w-4 text-church-red-500" />
                            </div>
                            <span className="text-sm font-medium truncate">
                              {evento.localizacao}
                            </span>
                          </div>
                        )}
                      </div>
                      
                      {/* Descrição */}
                      {evento.descricao && (
                        <p className="text-church-blue-700 line-clamp-3 leading-relaxed">
                          {evento.descricao}
                        </p>
                      )}

                      {/* Call to action implícito */}
                      <div className="mt-4 pt-4 border-t border-church-sky-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <p className="text-church-gold-600 font-medium text-sm">
                          Clique para ver detalhes →
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {eventos.length > visibleItems && (
            <>
              <Button
                variant="outline"
                size="icon"
                className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/90 hover:bg-church-gold-500 hover:text-white transition-all duration-300 border-church-gold-300 shadow-lg backdrop-blur-sm z-10"
                onClick={prevSlide}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/90 hover:bg-church-gold-500 hover:text-white transition-all duration-300 border-church-gold-300 shadow-lg backdrop-blur-sm z-10"
                onClick={nextSlide}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </>
          )}

          {/* Indicadores mejorados */}
          {eventos.length > visibleItems && (
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {Array.from({ length: eventos.length - (visibleItems - 1) }).map(
                (_, index) => (
                  <button
                    key={index}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentIndex 
                        ? "bg-church-gold-500 scale-125 shadow-lg" 
                        : "bg-church-sky-300 hover:bg-church-gold-400"
                    }`}
                    onClick={() => setCurrentIndex(index)}
                  />
                )
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}