"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  CalendarIcon,
  Clock,
  MapPin,
  Sparkles,
  Heart,
  Users,
} from "lucide-react";
import { IEventoResponse } from "@/insfractucture/interfaces/eventos/eventos.interfaces";
import { BackgroundVariantProps, getVariantClasses } from "@/lib/styles";

interface EventosCarouselProps extends BackgroundVariantProps {
  eventos: IEventoResponse[];
}

export function EventosCarousel({
  eventos,
  backgroundVariant = "gradient",
}: EventosCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState(3);
  const [isLoaded, setIsLoaded] = useState(false);
  const { background, text, subtext, isDark, card, overlay } =
    getVariantClasses(backgroundVariant);

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
    return new Date(dateString).toLocaleDateString("pt-BR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
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
      <section className={`py-20 ${background} relative overflow-hidden`}>
        {/* Decoración de fondo */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 right-10 w-32 h-32 bg-church-gold-400 rounded-full animate-pulse"></div>
          <div
            className="absolute bottom-20 left-10 w-24 h-24 bg-church-blue-400 rounded-full animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute top-1/2 left-1/4 w-16 h-16 bg-church-red-400 rounded-full animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="relative bg-church-gold-500 rounded-full p-4 shadow-xl">
                <CalendarIcon className="w-8 h-8 text-white" />
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-church-red-500 rounded-full flex items-center justify-center animate-pulse">
                  <Sparkles className="w-3 h-3 text-white" />
                </div>
              </div>
            </div>
            <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${text}`}>
              Próximos
              <br />
              <span className="text-church-gold-500">Eventos</span>
            </h2>
            <p className={`text-lg md:text-xl ${subtext}`}>
              Nenhum evento programado no momento
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`py-20 ${background} relative overflow-hidden`}>
      {/* Decoração de fondo */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 right-10 w-32 h-32 bg-church-gold-400 rounded-full animate-pulse"></div>
        <div
          className="absolute bottom-20 left-10 w-24 h-24 bg-church-blue-400 rounded-full animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/4 w-16 h-16 bg-church-red-400 rounded-full animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header estandarizado */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ease-out ${
            isLoaded
              ? "transform translate-y-0 opacity-100"
              : "transform translate-y-8 opacity-0"
          }`}
        >
          {/* Ícono decorativo */}
          <div className="flex justify-center mb-6">
            <div className="relative bg-church-gold-500 rounded-full p-4 shadow-xl">
              <Sparkles className="w-8 h-8 text-white" />
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-church-red-500 rounded-full flex items-center justify-center animate-pulse">
                <Heart className="w-3 h-3 text-white" />
              </div>
              <div className="absolute -bottom-1 -left-1 w-5 h-5 bg-church-blue-500 rounded-full flex items-center justify-center">
                <CalendarIcon className="w-2 h-2 text-white" />
              </div>
            </div>
          </div>

          <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${text}`}>
            Próximos
            <br />
            <span className="text-church-gold-500">Eventos</span>
          </h2>

          <p
            className={`text-lg md:text-xl max-w-2xl mx-auto leading-relaxed ${subtext}`}
          >
            Participe da nossa comunidade e venha viver momentos especiais de fé
            e comunhão
          </p>

          {/* Stats decorativos */}
          <div
            className={`flex justify-center items-center space-x-8 mt-8 transition-all duration-1000 ease-out delay-300 ${
              isLoaded
                ? "transform translate-y-0 opacity-100"
                : "transform translate-y-8 opacity-0"
            }`}
          >
            <div className="text-center">
              <div
                className={`w-12 h-12 mx-auto mb-2 rounded-lg flex items-center justify-center ${
                  isDark ? "bg-church-red-600" : "bg-church-red-200"
                }`}
              >
                <CalendarIcon
                  className={`w-6 h-6 ${
                    isDark ? "text-white" : "text-church-red-600"
                  }`}
                />
              </div>
              <p className={`text-sm font-medium ${subtext}`}>
                Eventos Especiais
              </p>
            </div>

            <div className="w-px h-12 bg-church-gold-300"></div>

            <div className="text-center">
              <div
                className={`w-12 h-12 mx-auto mb-2 rounded-lg flex items-center justify-center ${
                  isDark ? "bg-church-gold-600" : "bg-church-gold-200"
                }`}
              >
                <Users
                  className={`w-6 h-6 ${
                    isDark ? "text-white" : "text-church-gold-600"
                  }`}
                />
              </div>
              <p className={`text-sm font-medium ${subtext}`}>
                Comunidade Unida
              </p>
            </div>

            <div className="w-px h-12 bg-church-gold-300"></div>

            <div className="text-center">
              <div
                className={`w-12 h-12 mx-auto mb-2 rounded-lg flex items-center justify-center ${
                  isDark ? "bg-church-blue-600" : "bg-church-blue-200"
                }`}
              >
                <Heart
                  className={`w-6 h-6 ${
                    isDark ? "text-white" : "text-church-blue-600"
                  }`}
                />
              </div>
              <p className={`text-sm font-medium ${subtext}`}>
                Feitos com Amor
              </p>
            </div>
          </div>
        </div>

        {/* Header del carousel con botón "Ver todos" */}
        <div
          className={`flex flex-col md:flex-row justify-between items-center mb-12 transition-all duration-1000 ease-out delay-500 ${
            isLoaded
              ? "transform translate-y-0 opacity-100"
              : "transform translate-y-8 opacity-0"
          }`}
        >
          <div className="text-center md:text-left mb-6 md:mb-0">
            <h3 className={`text-2xl font-bold ${text}`}>Em Destaque</h3>
            <p className={`${subtext}`}>
              Confira os próximos eventos da nossa igreja
            </p>
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

        <div
          className={`relative w-full overflow-hidden transition-all duration-1000 ease-out delay-700 ${
            isLoaded
              ? "transform translate-y-0 opacity-100"
              : "transform translate-y-12 opacity-0"
          }`}
        >
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / visibleItems)}%)`,
            }}
          >
            {eventos.map((evento) => (
              <Link
                href={`/eventos/${evento.slug}`}
                key={evento.id}
                className="px-3 flex-shrink-0"
                style={{ width: `${100 / visibleItems}%` }}
              >
                <div className="block group">
                  <div
                    className={`${card} rounded-xl shadow-lg overflow-hidden transition-all duration-300 group-hover:shadow-2xl group-hover:-translate-y-2 border relative`}
                  >
                    {/* Gradient overlay sutil */}
                    <div className="h-1 bg-gradient-to-r from-church-gold-400 via-church-blue-400 to-church-gold-400"></div>

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
                          {evento.status === "ativo"
                            ? "✨ Ativo"
                            : "✅ Concluído"}
                        </span>
                      </div>
                    </div>

                    <div className="p-6">
                      <h3
                        className={`text-xl font-bold mb-3 group-hover:text-church-gold-600 transition-colors duration-300 line-clamp-2 ${text}`}
                      >
                        {evento.nome}
                      </h3>

                      {/* Info con ícones coloridos usando las clases dinámicas */}
                      <div className="space-y-2 mb-4">
                        <div className={`flex items-center ${subtext}`}>
                          <div
                            className={`flex items-center justify-center w-8 h-8 rounded-lg mr-3 ${
                              isDark ? "bg-church-sky-600" : "bg-church-sky-100"
                            }`}
                          >
                            <CalendarIcon
                              className={`h-4 w-4 ${
                                isDark ? "text-white" : "text-church-blue-500"
                              }`}
                            />
                          </div>
                          <span className="text-sm font-medium">
                            {formatDate(evento.data_inicio)}
                          </span>
                        </div>

                        <div className={`flex items-center ${subtext}`}>
                          <div
                            className={`flex items-center justify-center w-8 h-8 rounded-lg mr-3 ${
                              isDark
                                ? "bg-church-gold-600"
                                : "bg-church-gold-100"
                            }`}
                          >
                            <Clock
                              className={`h-4 w-4 ${
                                isDark ? "text-white" : "text-church-gold-600"
                              }`}
                            />
                          </div>
                          <span className="text-sm font-medium">
                            {formatTime(evento.data_inicio)}
                          </span>
                        </div>

                        {evento.localizacao && (
                          <div className={`flex items-center ${subtext}`}>
                            <div
                              className={`flex items-center justify-center w-8 h-8 rounded-lg mr-3 ${
                                isDark
                                  ? "bg-church-red-600"
                                  : "bg-church-red-100"
                              }`}
                            >
                              <MapPin
                                className={`h-4 w-4 ${
                                  isDark ? "text-white" : "text-church-red-500"
                                }`}
                              />
                            </div>
                            <span className="text-sm font-medium truncate">
                              {evento.localizacao}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Descripción */}
                      {evento.descricao && (
                        <p
                          className={`${subtext} line-clamp-3 leading-relaxed`}
                        >
                          {evento.descricao}
                        </p>
                      )}

                      {/* Call to action implícito */}
                      <div
                        className={`mt-4 pt-4 border-t opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                          isDark
                            ? "border-church-sky-600"
                            : "border-church-sky-200"
                        }`}
                      >
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
                className={`absolute top-1/2 left-4 transform -translate-y-1/2 hover:bg-church-gold-500 hover:text-white transition-all duration-300 border-church-gold-300 shadow-lg backdrop-blur-sm z-10 ${
                  isDark
                    ? "bg-white/20 text-white border-white/30"
                    : "bg-white/90"
                }`}
                onClick={prevSlide}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className={`absolute top-1/2 right-4 transform -translate-y-1/2 hover:bg-church-gold-500 hover:text-white transition-all duration-300 border-church-gold-300 shadow-lg backdrop-blur-sm z-10 ${
                  isDark
                    ? "bg-white/20 text-white border-white/30"
                    : "bg-white/90"
                }`}
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

        {/* Call to action final */}
        <div
          className={`text-center mt-16 transition-all duration-1000 ease-out delay-900 ${
            isLoaded
              ? "transform translate-y-0 opacity-100"
              : "transform translate-y-8 opacity-0"
          }`}
        >
          <div
            className={`inline-flex items-center space-x-2 px-6 py-3 rounded-full ${overlay}`}
          >
            <Sparkles
              className={`w-5 h-5 ${
                isDark ? "text-church-sky-300" : "text-church-blue-600"
              }`}
            />
            <p className={`text-sm font-medium ${subtext}`}>
              &ldquo;Cada evento é uma nova oportunidade de crescer em fé e
              comunhão&rdquo;
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
