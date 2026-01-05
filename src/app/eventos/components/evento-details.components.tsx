"use client";

import Image from "next/image";
import Link from "next/link";
import {
  CalendarIcon,
  MapPinIcon,
  ArrowLeftIcon,
  ClockIcon,
  Sparkles,
  Heart,
  Phone,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";
import rehypeRaw from "rehype-raw";
import { IEventoResponse } from "@/insfractucture/interfaces/eventos/eventos.interfaces";
import { useEffect, useState } from "react";
import { ShareButton } from "@/app/components/shareButton";

interface EventoDetailComponentProps {
  evento: IEventoResponse;
}

export const EventoDetailComponent = ({
  evento,
}: EventoDetailComponentProps) => {
  const [mounted, setMounted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

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

  const formatDatetime = (dateString: string) => {
    if (!mounted) return "";

    return new Date(dateString).toLocaleDateString("pt-BR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const isEventUpcoming = () => {
    if (!mounted) return false;
    return new Date(evento.data_inicio) > new Date();
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-church-sky-50 via-white to-church-blue-50">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-church-sky-300 rounded w-1/4 mb-8"></div>
            <div className="bg-white/80 rounded-2xl shadow-xl overflow-hidden">
              <div className="h-96 bg-church-sky-200"></div>
              <div className="p-8">
                <div className="h-8 bg-church-sky-200 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-church-sky-100 rounded w-1/2 mb-6"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-church-sky-100 rounded w-full"></div>
                  <div className="h-4 bg-church-sky-100 rounded w-5/6"></div>
                  <div className="h-4 bg-church-sky-100 rounded w-4/6"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-church-sky-50 via-white to-church-blue-50 relative overflow-hidden">
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

      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Botón de regreso mejorado */}
        <div
          className={`mb-8 transition-all duration-1000 ease-out ${
            isLoaded
              ? "transform translate-y-0 opacity-100"
              : "transform translate-y-8 opacity-0"
          }`}
        >
          <Link
            href="/eventos"
            className="group inline-flex items-center px-4 py-2 bg-church-blue-500 text-white rounded-lg hover:bg-church-blue-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <ArrowLeftIcon className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
            Voltar aos eventos
          </Link>
        </div>

        {/* Card principal del evento */}
        <div
          className={`bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-church-sky-200 transition-all duration-1000 ease-out delay-200 ${
            isLoaded
              ? "transform translate-y-0 opacity-100"
              : "transform translate-y-12 opacity-0"
          }`}
        >
          {/* Línea decorativa superior */}
          <div className="h-1 bg-gradient-to-r from-church-gold-400 via-church-blue-400 to-church-gold-400"></div>

          {/* Imagen del evento */}
          <div className="relative w-full">
            <div className="relative overflow-hidden">
              <Image
                src={evento.imagem || "/placeholder.svg"}
                alt={evento.nome}
                width={1200}
                height={600}
                className="w-full h-auto max-h-[600px] object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 1200px"
                priority
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
            </div>

            {/* Overlay con estado del evento */}
            <div className="absolute top-6 right-6">
              <span
                className={`px-4 py-2 rounded-full text-sm font-semibold shadow-lg backdrop-blur-sm ${
                  evento.status === "ativo"
                    ? "bg-church-gold-500 text-white"
                    : "bg-gray-500 text-white"
                }`}
              >
                {evento.status === "ativo"
                  ? "✨ Evento Ativo"
                  : "⏸️ Evento Inativo"}
              </span>
            </div>

            {/* Badge de próximo evento */}
            {isEventUpcoming() && (
              <div className="absolute top-6 left-6">
                <span className="bg-church-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg backdrop-blur-sm animate-pulse">
                  🔥 Evento Próximo
                </span>
              </div>
            )}

            {/* Botón de compartir flotante */}
            <div className="absolute bottom-6 right-6">
              <ShareButton
                title={`${evento.nome} - Evento da Igreja`}
                text={`Participe do evento "${evento.nome}" em ${evento.localizacao}. Data: ${formatDatetime(evento.data_inicio)}`}
                variant="floating"
                size="md"
                toastMessage="Link do evento copiado para a área de transferência!"
                onSuccess={(shared) => {
                  console.log(
                    shared
                      ? "Evento compartilhado via aplicativo"
                      : "Link copiado para área de transferência"
                  );
                }}
              />
            </div>
          </div>

          {/* Contenido del evento */}
          <div className="p-8 md:p-12">
            {/* Título con decoración */}
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="relative bg-church-gold-500 rounded-full p-3 shadow-lg">
                  <Sparkles className="w-6 h-6 text-white" />
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-church-red-500 rounded-full flex items-center justify-center">
                    <Heart className="w-2 h-2 text-white" />
                  </div>
                </div>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-church-blue-900 mb-4 leading-tight">
                {evento.nome}
              </h1>
              <div className="w-24 h-1 bg-church-gold-500 mx-auto rounded-full"></div>
            </div>

            {/* Información del evento con cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {/* Fecha y hora */}
              <div className="bg-church-sky-50 rounded-xl p-6 border border-church-sky-200">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-church-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CalendarIcon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-church-blue-900 mb-2 text-lg">
                      Data e Horário
                    </h3>
                    <p className="text-church-blue-700 capitalize font-medium mb-2">
                      {formatDatetime(evento.data_inicio)}
                    </p>
                    <div className="flex items-center text-church-blue-600">
                      <ClockIcon className="h-4 w-4 mr-2" />
                      <span className="font-medium">
                        {formatTime(evento.data_inicio)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Localización */}
              <div className="bg-church-red-50 rounded-xl p-6 border border-church-red-200">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-church-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPinIcon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-church-blue-900 mb-2 text-lg">
                      Local do Evento
                    </h3>
                    <p className="text-church-blue-700 font-medium">
                      {evento.localizacao}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Descripción con Markdown MEJORADA */}
            <div className="mb-12">
              <div className="bg-white/80 rounded-xl p-8 border border-church-gold-200 shadow-lg">
                <h3 className="text-2xl font-bold text-church-blue-900 mb-6 flex items-center">
                  <div className="w-8 h-8 bg-church-gold-500 rounded-lg flex items-center justify-center mr-3">
                    <Heart className="w-4 h-4 text-white" />
                  </div>
                  Sobre o Evento
                </h3>

                {/* RENDERIZADO DE MARKDOWN CON REACT-MARKDOWN */}
                <div className="prose prose-lg max-w-none prose-headings:text-church-blue-900 prose-p:text-church-blue-700 prose-a:text-church-gold-600 prose-strong:text-church-gold-600 prose-ul:text-church-blue-700 prose-ol:text-church-blue-700">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw, rehypeSanitize]}
                    components={{
                      // Títulos
                      h1: ({ children }) => (
                        <h1 className="text-3xl font-bold text-church-gold-600 mt-6 mb-4">
                          {children}
                        </h1>
                      ),
                      h2: ({ children }) => (
                        <h2 className="text-2xl font-bold text-church-gold-600 mt-5 mb-3">
                          {children}
                        </h2>
                      ),
                      h3: ({ children }) => (
                        <h3 className="text-xl font-bold text-church-blue-800 mt-4 mb-2">
                          {children}
                        </h3>
                      ),
                      h4: ({ children }) => (
                        <h4 className="text-lg font-bold text-church-blue-800 mt-3 mb-2">
                          {children}
                        </h4>
                      ),

                      // Párrafos
                      p: ({ children }) => (
                        <p className="mb-4 leading-relaxed text-church-blue-700 text-lg">
                          {children}
                        </p>
                      ),

                      // Listas
                      ul: ({ children }) => (
                        <ul className="list-disc list-inside mb-4 space-y-2 text-church-blue-700">
                          {children}
                        </ul>
                      ),
                      ol: ({ children }) => (
                        <ol className="list-decimal list-inside mb-4 space-y-2 text-church-blue-700">
                          {children}
                        </ol>
                      ),
                      li: ({ children }) => (
                        <li className="ml-4">{children}</li>
                      ),

                      // Negrita e itálica
                      strong: ({ children }) => (
                        <strong className="font-bold text-church-gold-600">
                          {children}
                        </strong>
                      ),
                      em: ({ children }) => (
                        <em className="italic text-church-blue-800">
                          {children}
                        </em>
                      ),

                      // Enlaces ✅ (AQUÍ estaba roto)
                      a: ({ children, href }) => (
                        <a
                          href={href}
                          className="text-church-gold-600 hover:text-church-gold-700 underline font-medium"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {children}
                        </a>
                      ),

                      // Citas
                      blockquote: ({ children }) => (
                        <blockquote className="border-l-4 border-church-gold-400 pl-4 italic my-4 text-church-blue-600 bg-church-sky-50 py-3 rounded-r-lg">
                          {children}
                        </blockquote>
                      ),

                      // Código (mejor separado en inline / block)
                      code: ({ children, className, ...props }) => {
                        const isBlock =
                          typeof className === "string" &&
                          className.includes("language-");

                        if (!isBlock) {
                          return (
                            <code
                              className="bg-church-sky-100 px-2 py-1 rounded text-sm font-mono text-church-blue-800"
                              {...props}
                            >
                              {children}
                            </code>
                          );
                        }

                        return (
                          <pre className="block bg-church-blue-900 text-white p-4 rounded-lg overflow-x-auto text-sm font-mono my-4">
                            <code className={className} {...props}>
                              {children}
                            </code>
                          </pre>
                        );
                      },

                      // Línea horizontal
                      hr: () => (
                        <hr className="my-6 border-t-2 border-church-gold-300" />
                      ),

                      // Tablas
                      table: ({ children }) => (
                        <div className="overflow-x-auto my-4">
                          <table className="min-w-full divide-y divide-church-sky-200 border border-church-sky-300">
                            {children}
                          </table>
                        </div>
                      ),
                      thead: ({ children }) => (
                        <thead className="bg-church-sky-100">{children}</thead>
                      ),
                      th: ({ children }) => (
                        <th className="px-4 py-2 text-left text-sm font-semibold text-church-blue-900">
                          {children}
                        </th>
                      ),
                      td: ({ children }) => (
                        <td className="px-4 py-2 text-sm text-church-blue-700 border-t border-church-sky-200">
                          {children}
                        </td>
                      ),
                    }}
                  >
                    {evento.descricao || "Sem descrição disponível."}
                  </ReactMarkdown>
                </div>
              </div>
            </div>

            {evento.status === "ativo" && (
              <div className="bg-gradient-to-r from-church-gold-500 to-church-blue-500 p-8 rounded-xl text-white shadow-xl mb-8">
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-3 flex items-center justify-center">
                    <Sparkles className="w-6 h-6 mr-2" />
                    Interessado em participar?
                  </h3>
                  <p className="text-lg mb-6 opacity-90">
                    Entre em contato conosco para mais informações sobre este
                    evento especial.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                      href="/contato"
                      className="group inline-flex items-center justify-center px-8 py-3 bg-white text-church-blue-600 rounded-lg font-semibold hover:bg-church-sky-50 transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                      <Phone className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                      Entre em Contato
                    </Link>

                    <ShareButton
                      title={`${evento.nome} - Evento da Igreja`}
                      text={`Participe do evento "${evento.nome}" em ${evento.localizacao}. Data: ${formatDatetime(evento.data_inicio)}`}
                      shareText="Compartilhar Evento"
                      copyText="Copiar Link do Evento"
                      loadingText="Compartilhando..."
                      successText="Evento Compartilhado!"
                      toastMessage="Link do evento copiado para a área de transferência!"
                      variant="primary"
                      size="md"
                      className="bg-church-red-500 hover:bg-church-red-600 group"
                      onSuccess={(shared) => {
                        console.log(
                          shared
                            ? "Evento compartilhado via aplicativo nativo"
                            : "Link copiado para área de transferência"
                        );
                      }}
                      onError={(error) => {
                        console.error("Erro ao compartilhar evento:", error);
                      }}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Información adicional */}
            <div className="bg-church-sky-50 rounded-xl p-6 border border-church-sky-200">
              <h4 className="font-semibold text-church-blue-900 mb-4">
                Informações do Sistema
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-church-blue-600">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-church-gold-500 rounded-full mr-2"></div>
                  <span className="font-medium">Criado em:</span>
                  <span className="ml-1">{formatDate(evento.created_at)}</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-church-blue-500 rounded-full mr-2"></div>
                  <span className="font-medium">Atualizado em:</span>
                  <span className="ml-1">{formatDate(evento.updated_at)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
