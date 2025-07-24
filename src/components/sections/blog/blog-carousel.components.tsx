"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, CalendarIcon, BookOpen, ArrowRight, Clock, Eye } from "lucide-react";
import { IBlogResponse } from "@/insfractucture/interfaces/blogs/blog.interfaces";
import { BackgroundVariantProps, getVariantClasses } from "@/lib/styles";


interface BlogsCarouselProps extends BackgroundVariantProps{
  blogs: IBlogResponse[];
}

export function BlogsCarousel({ blogs, backgroundVariant = 'white' }: BlogsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState(3);
  const [isLoaded, setIsLoaded] = useState(false);

  const { background, text, subtext, isDark, buttons, card } = getVariantClasses(backgroundVariant);

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

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 < blogs.length - (visibleItems - 1) ? prevIndex + 1 : 0
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - 1 >= 0 ? prevIndex - 1 : blogs.length - visibleItems
    );
  };

  if (!blogs || blogs.length === 0) {
    return (
      <section className={`py-20 ${background}`}>
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-church-blue-100 rounded-full mb-4">
              <BookOpen className="w-8 h-8 text-church-blue-600" />
            </div>
            <h2 className={`text-4xl font-bold mb-4 ${text}`}>Últimas do Blog</h2>
            <p className={`text-lg ${subtext}`}>
              Nenhuma entrada disponível no momento
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`py-20 ${background} relative overflow-hidden`}>
      {/* Decoración de fondo */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-church-blue-400 rounded-full"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-church-gold-400 rounded-full"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-church-red-400 rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header mejorado */}
        <div className={`flex flex-col md:flex-row justify-between items-center mb-16 transition-all duration-1000 ease-out ${
          isLoaded ? 'transform translate-y-0 opacity-100' : 'transform translate-y-8 opacity-0'
        }`}>
          <div className="flex items-center space-x-4 mb-6 md:mb-0">
            <div className="relative bg-church-blue-500 rounded-full p-4 shadow-xl">
              <BookOpen className="w-8 h-8 text-white" />
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-church-gold-500 rounded-full flex items-center justify-center animate-pulse">
                <Eye className="w-3 h-3 text-white" />
              </div>
            </div>
            <div>
              <h2 className={`text-4xl md:text-5xl font-bold ${text}`}>
                Últimas do
                <span className="text-church-blue-500 ml-2">Blog</span>
              </h2>
              <p className={`text-lg ${subtext} mt-2`}>
                Reflexões, estudos e inspirações para sua jornada
              </p>
            </div>
          </div>
          
          <Link 
            href="/blog" 
            className={`group relative px-6 py-3 ${buttons.primary} font-semibold rounded-lg transition-all duration-300 hover:shadow-lg transform hover:scale-105`}
          >
            <span className="relative z-10 flex items-center">
              Ver todas
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
          </Link>
        </div>

        <div className="relative w-full overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / visibleItems)}%)`,
            }}
          >
            {blogs.map((post, index) => (
              <div
                key={post.id}
                className="px-3 flex-shrink-0"
                style={{ width: `${100 / visibleItems}%` }}
              >
                <div className={`transition-all duration-700 ease-out ${
                  isLoaded 
                    ? 'transform translate-y-0 opacity-100' 
                    : 'transform translate-y-12 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <Link href={`/blog/${post.slug}`} className="block group">
                    <article className={`${card} rounded-xl shadow-lg overflow-hidden transition-all duration-300 group-hover:shadow-2xl group-hover:-translate-y-2 border relative`}>
                      {/* Línea decorativa superior */}
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-church-blue-400 via-church-gold-400 to-church-blue-400"></div>
                      
                      <div className="relative h-64 md:h-72 lg:h-80 overflow-hidden">
                        <Image
                          src={post.image || "/placeholder.svg"}
                          alt={post.title}
                          fill
                          className="object-cover transition-all duration-500 group-hover:scale-110"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                        
                        {/* Overlay gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        
                        {/* Badge de categoría */}
                        <div className="absolute top-4 left-4">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-church-blue-500 text-white shadow-lg backdrop-blur-sm">
                            📖 Reflexão
                          </span>
                        </div>

                        {/* Reading time badge */}
                        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                          <div className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
                            <Clock className="w-3 h-3 text-white" />
                            <span className="text-xs text-white font-medium">5 min</span>
                          </div>
                        </div>
                      </div>

                      <div className="p-6">
                        <h3 className={`text-xl font-bold mb-3 ${
                          isDark ? 'text-white' : 'text-church-blue-900'
                        } group-hover:text-church-blue-500 transition-colors duration-300 line-clamp-2 leading-tight`}>
                          {post.title}
                        </h3>
                        
                        {/* Data com ícone melhorado */}
                        <div className={`flex items-center mb-4 ${
                          isDark ? 'text-church-sky-300' : 'text-church-blue-600'
                        }`}>
                          <div className="flex items-center justify-center w-8 h-8 bg-church-gold-100 rounded-lg mr-3">
                            <CalendarIcon className="h-4 w-4 text-church-gold-600" />
                          </div>
                          <span className="text-sm font-medium">
                            {formatDate(post.created_at)}
                          </span>
                        </div>

                        {/* Descripción */}
                        <p className={`${
                          isDark ? 'text-church-sky-200' : 'text-church-blue-700'
                        } line-clamp-3 leading-relaxed mb-4`}>
                          {post.description}
                        </p>

                        {/* Call to action implícito */}
                        <div className="pt-4 border-t border-church-sky-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="flex items-center justify-between">
                            <p className="text-church-blue-500 font-medium text-sm">
                              Ler artigo completo
                            </p>
                            <ArrowRight className="w-4 h-4 text-church-blue-500 group-hover:translate-x-1 transition-transform duration-300" />
                          </div>
                        </div>
                      </div>
                    </article>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {blogs.length > visibleItems && (
            <>
              <Button
                variant="outline"
                size="icon"
                className={`absolute top-1/2 left-4 transform -translate-y-1/2 transition-all duration-300 shadow-xl z-10 ${buttons.outline}`}
                onClick={prevSlide}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className={`absolute top-1/2 right-4 transform -translate-y-1/2 transition-all duration-300 shadow-xl z-10 ${buttons.outline}`}
                onClick={nextSlide}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </>
          )}

          {/* Indicadores mejorados */}
          {blogs.length > visibleItems && (
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
              {Array.from({ length: blogs.length - (visibleItems - 1) }).map(
                (_, index) => (
                  <button
                    key={index}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentIndex 
                        ? "bg-church-blue-500 scale-125 shadow-lg shadow-church-blue-500/50" 
                        : isDark 
                          ? "bg-church-sky-400 hover:bg-church-blue-400" 
                          : "bg-church-sky-300 hover:bg-church-blue-400"
                    }`}
                    onClick={() => setCurrentIndex(index)}
                  />
                )
              )}
            </div>
          )}
        </div>

        {/* Stats del blog */}
        <div className={`text-center mt-16 transition-all duration-1000 ease-out delay-700 ${
          isLoaded ? 'transform translate-y-0 opacity-100' : 'transform translate-y-8 opacity-0'
        }`}>
          <div className="flex justify-center items-center space-x-8">
            <div className="text-center">
              <div className={`text-2xl font-bold ${text} mb-1`}>
                {blogs.length}+
              </div>
              <p className={`text-sm ${subtext}`}>
                Artigos Publicados
              </p>
            </div>

            <div className="w-px h-12 bg-church-gold-300"></div>

            <div className="text-center">
              <div className={`text-2xl font-bold ${text} mb-1`}>
                ∞
              </div>
              <p className={`text-sm ${subtext}`}>
                Inspiração Infinita
              </p>
            </div>

            <div className="w-px h-12 bg-church-gold-300"></div>

            <div className="text-center">
              <div className={`text-2xl font-bold ${text} mb-1`}>
                💝
              </div>
              <p className={`text-sm ${subtext}`}>
                Feito com Amor
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}