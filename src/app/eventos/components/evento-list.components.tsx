"use client";

import Link from "next/link";
import Image from "next/image";
import {
  CalendarIcon,
  MapPinIcon,
  ClockIcon,
  Sparkles,
  Heart,
  ArrowRight,
  Users,
} from "lucide-react";
import { IEventoResponse } from "@/insfractucture/interfaces/eventos/eventos.interfaces";
import { BackgroundVariantProps, getVariantClasses } from "@/lib/styles";
import { useEffect, useState } from "react";
import { MarkdownRenderer } from "./MarkdownRenderer";

interface EventosListComponentProps extends BackgroundVariantProps {
  eventos: IEventoResponse[];
}

export const EventosListComponent = ({
  eventos,
  backgroundVariant = "gradient",
}: EventosListComponentProps) => {
  const [mounted, setMounted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const { background, text, subtext, isDark, card, overlay } =
    getVariantClasses(backgroundVariant);

  useEffect(() => {
    setMounted(true);
    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  const formatDate = (dateString: string) => {
    if (!mounted) return "";

    return new Date(dateString).toLocaleDateString("pt-BR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (dateString: string) => {
    if (!mounted) return "";

    return new Date(dateString).toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const isEventUpcoming = (dateString: string) => {
    if (!mounted) return false;
    return new Date(dateString) > new Date();
  };

  if (!mounted) {
    return (
      <section
        className={`min-h-screen ${background} relative overflow-hidden`}
      >
        <div className="container mx-auto px-4 py-16">
          <h2 className={`text-3xl font-bold mb-8 ${text}`}>
            Eventos Espirituais
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {eventos.map((evento) => (
              <div
                key={evento.id}
                className={`${card} rounded-xl shadow-lg overflow-hidden`}
              >
                <div className="relative h-48 overflow-hidden bg-church-sky-100 animate-pulse">
                  <div className="w-full h-full bg-church-sky-200"></div>
                </div>
                <div className="p-5">
                  <div className="h-6 bg-church-sky-200 rounded animate-pulse mb-2"></div>
                  <div className="h-4 bg-church-sky-100 rounded animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`min-h-screen ${background} relative overflow-hidden`}>
      {/* Decoración de fondo */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-church-gold-400 rounded-full animate-pulse"></div>
        <div
          className="absolute bottom-20 right-10 w-24 h-24 bg-church-blue-400 rounded-full animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/4 w-16 h-16 bg-church-red-400 rounded-full animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        {/* Header mejorado siguiendo el mismo patrón */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ease-out ${
            isLoaded
              ? "transform translate-y-0 opacity-100"
              : "transform translate-y-8 opacity-0"
          }`}
        >
          {/* Ícono decorativo igual que otros componentes */}
          <div className="flex justify-center mb-6">
            <div className="relative bg-church-red-500 rounded-full p-4 shadow-xl">
              <CalendarIcon className="w-8 h-8 text-white" />
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-church-gold-500 rounded-full flex items-center justify-center animate-pulse">
                <Sparkles className="w-3 h-3 text-white" />
              </div>
              <div className="absolute -bottom-1 -left-1 w-5 h-5 bg-church-blue-500 rounded-full flex items-center justify-center">
                <Heart className="w-2 h-2 text-white" />
              </div>
            </div>
          </div>

          <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${text}`}>
            Eventos
            <br />
            <span className="text-church-gold-500">Espirituais</span>
          </h1>

          <p
            className={`text-lg md:text-xl max-w-3xl mx-auto leading-relaxed ${subtext}`}
          >
            Participe dos nossos encontros e eventos especiais. Uma oportunidade
            de crescimento espiritual e comunhão em família.
          </p>

          {/* Stats decorativos igual que otros componentes */}
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
                {eventos.length}+ Eventos
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

        {!eventos || eventos.length === 0 ? (
          <div
            className={`text-center py-16 transition-all duration-1000 ease-out delay-500 ${
              isLoaded
                ? "transform translate-y-0 opacity-100"
                : "transform translate-y-8 opacity-0"
            }`}
          >
            <div
              className={`max-w-md mx-auto ${card} rounded-2xl p-8 shadow-xl border`}
            >
              <div className="w-20 h-20 bg-church-gold-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CalendarIcon className="h-10 w-10 text-church-gold-600" />
              </div>
              <h3 className={`text-2xl font-bold mb-3 ${text}`}>
                Nenhum evento disponível
              </h3>
              <p className={`${subtext} leading-relaxed`}>
                Os próximos eventos aparecerão aqui quando estiverem
                disponíveis. Fique atento às nossas redes sociais!
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {eventos.map((evento, index) => (
              <div
                key={evento.id}
                className={`transition-all duration-700 ease-out ${
                  isLoaded
                    ? "transform translate-y-0 opacity-100"
                    : "transform translate-y-12 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <Link href={`/eventos/${evento.slug}`} className="block group">
                  <div
                    className={`${card} rounded-2xl shadow-xl overflow-hidden transition-all duration-300 group-hover:shadow-2xl group-hover:-translate-y-3 border relative`}
                  >
                    {/* Línea decorativa superior */}
                    <div className="h-1 bg-gradient-to-r from-church-blue-400 via-church-gold-400 to-church-blue-400"></div>

                    {/* Imagen del evento */}
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={evento.imagem || "/placeholder.svg"}
                        alt={evento.nome}
                        fill
                        className="object-cover transition-all duration-500 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />

                      {/* Overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                      {/* Badge de estado mejorado */}
                      <div className="absolute top-4 right-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold shadow-lg backdrop-blur-sm ${
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

                      {/* Badge de próximo evento */}
                      {isEventUpcoming(evento.data_inicio) && (
                        <div className="absolute top-4 left-4">
                          <span className="bg-church-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg backdrop-blur-sm">
                            🔥 Próximo
                          </span>
                        </div>
                      )}

                      {/* Badge de tiempo restante */}
                      <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                        <div className="bg-black/70 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
                          <ClockIcon className="w-3 h-3 text-white" />
                          <span className="text-xs text-white font-medium">
                            Em breve
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Contenido */}
                    <div className="p-6">
                      {/* Título */}
                      <h3
                        className={`text-xl font-bold mb-3 group-hover:text-church-gold-600 transition-colors duration-300 line-clamp-2 leading-tight ${text}`}
                      >
                        {evento.nome}
                      </h3>

                      {/* Información con íconos mejorados */}
                      <div className="space-y-3 mb-4">
                        <div className={`flex items-center ${subtext}`}>
                          <div
                            className={`w-8 h-8 rounded-lg flex items-center justify-center mr-3 ${
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
                            className={`w-8 h-8 rounded-lg flex items-center justify-center mr-3 ${
                              isDark
                                ? "bg-church-gold-600"
                                : "bg-church-gold-100"
                            }`}
                          >
                            <ClockIcon
                              className={`h-4 w-4 ${
                                isDark ? "text-white" : "text-church-gold-600"
                              }`}
                            />
                          </div>
                          <span className="text-sm font-medium">
                            {formatTime(evento.data_inicio)}
                          </span>
                        </div>

                        <div className={`flex items-center ${subtext}`}>
                          <div
                            className={`w-8 h-8 rounded-lg flex items-center justify-center mr-3 ${
                              isDark ? "bg-church-red-600" : "bg-church-red-100"
                            }`}
                          >
                            <MapPinIcon
                              className={`h-4 w-4 ${
                                isDark ? "text-white" : "text-church-red-500"
                              }`}
                            />
                          </div>
                          <span className="text-sm font-medium line-clamp-1">
                            {evento.localizacao}
                          </span>
                        </div>
                      </div>

                      {/* Descripción */}
                      <div className={`${subtext} text-sm mb-4`}>
                        <MarkdownRenderer
                          content={evento.descricao || ""}
                          variant="compact"
                          maxLines={3}
                        />
                      </div>
                      {/* Call to action */}
                      <div
                        className={`pt-4 border-t opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                          isDark
                            ? "border-church-sky-600"
                            : "border-church-sky-200"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-church-gold-600 text-sm font-semibold">
                            Ver detalhes completos
                          </span>
                          <ArrowRight className="w-4 h-4 text-church-gold-600 group-hover:translate-x-1 transition-transform duration-300" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}

        {/* Call to action final igual que otros componentes */}
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
              &ldquo;Cada evento é uma oportunidade de crescer na fé e em
              comunhão&rdquo;
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
