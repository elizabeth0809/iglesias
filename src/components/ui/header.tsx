"use client";
import Link from "next/link";
import Image from "next/image";
import { Navigation } from "../Navigate";
import { useState, useEffect } from "react";
import { Heart, Sparkles, Facebook, Instagram} from 'lucide-react';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-church-sky-200' 
        : 'bg-white/90 backdrop-blur-sm border-b border-church-sky-100'
    } supports-[backdrop-filter]:bg-white/80`}>
      <div className="container flex items-center justify-between px-4 md:px-6 h-16 md:h-20">
        <Link href="/" className={`flex items-center group transition-all duration-500 ease-out ${
          isLoaded ? 'transform translate-x-0 opacity-100' : 'transform -translate-x-8 opacity-0'
        }`}>
          <div className="relative flex-shrink-0">
            {/* Logo principal */}
            <div className="relative overflow-hidden rounded-full">
              <Image 
                src="/logo.jpg"
                alt="Logo Igreja Batista Renovada Sonho de Deus"
                width={42}
                height={42}
                className="md:w-[50px] md:h-[50px] rounded-full shadow-lg transition-transform duration-300 group-hover:scale-110"
              />
              {/* Overlay sutil en hover - solo en desktop */}
              <div className="absolute inset-0 bg-church-gold-400/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:block"></div>
            </div>
            
            {/* Decoraciones flotantes - solo en desktop */}
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-church-gold-500 rounded-full items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-0 group-hover:scale-100 hidden md:flex">
              <Heart className="w-2 h-2 text-white" />
            </div>
            
            <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-church-blue-500 rounded-full items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-0 group-hover:scale-100 hidden md:flex" style={{ transitionDelay: '100ms' }}>
              <Sparkles className="w-1 h-1 text-white" />
            </div>
          </div>
          
          {/* Texto del logo - responsive */}
          <div className="ml-3 min-w-0 flex-1">
            {/* Versión desktop */}
            <div className="hidden md:block">
              <div className="flex flex-col">
                <span className="text-lg font-bold text-church-blue-900 group-hover:text-church-blue-700 transition-colors duration-300 leading-tight">
                  Igreja Batista Renovada
                </span>
                <span className="text-base font-semibold text-church-gold-600 group-hover:text-church-gold-500 transition-colors duration-300 leading-tight">
                  Sonho de Deus
                </span>
              </div>
            </div>
            
            {/* Versión tablet */}
            <div className="hidden sm:block md:hidden">
              <div className="flex flex-col">
                <span className="text-base font-bold text-church-blue-900 group-hover:text-church-blue-700 transition-colors duration-300 leading-tight">
                  Igreja Batista Renovada
                </span>
                <span className="text-sm font-semibold text-church-gold-600 group-hover:text-church-gold-500 transition-colors duration-300 leading-tight">
                  Sonho de Deus
                </span>
              </div>
            </div>
            
            {/* Versión móvil pequeña */}
            <div className="block sm:hidden">
              <div className="flex flex-col">
                <span className="text-sm font-bold text-church-blue-900 group-hover:text-church-blue-700 transition-colors duration-300 leading-tight">
                  Igreja Batista
                </span>
                <span className="text-xs font-semibold text-church-gold-600 group-hover:text-church-gold-500 transition-colors duration-300 leading-tight">
                  Sonho de Deus
                </span>
              </div>
            </div>
          </div>
        </Link>

        {/* Navegación */}
        <div className={`transition-all duration-500 ease-out delay-200 flex-shrink-0 ${
          isLoaded ? 'transform translate-x-0 opacity-100' : 'transform translate-x-8 opacity-0'
        }`}>
          <Navigation />
        </div>
      </div>

      {/* Barra gradiente */}
      <div className={`h-1 bg-gradient-to-r from-church-blue-500 via-church-gold-400 to-church-blue-500 transition-all duration-300 ${
        isScrolled ? 'opacity-100' : 'opacity-0'
      }`}></div>
    </header>
  );
}

export function MinimalHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-church-sky-200' 
        : 'bg-white/90 backdrop-blur-sm border-b border-church-sky-100'
    } supports-[backdrop-filter]:bg-white/80`}>
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        
        <Link href="/" className={`flex items-center group transition-all duration-500 ease-out ${
          isLoaded ? 'transform translate-x-0 opacity-100' : 'transform -translate-x-8 opacity-0'
        }`}>
          <div className="relative flex-shrink-0">
            {/* Logo principal */}
            <div className="relative overflow-hidden rounded-full">
              <Image 
                src="/logo.jpg"
                alt="Logo Igreja Batista Renovada Sonho de Deus"
                width={42}
                height={42}
                className="rounded-full shadow-lg transition-transform duration-300 group-hover:scale-110"
              />
              {/* Overlay sutil en hover - solo en desktop */}
              <div className="absolute inset-0 bg-church-gold-400/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:block"></div>
            </div>
            
            {/* Decoraciones flotantes - solo en desktop */}
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-church-gold-500 rounded-full items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-0 group-hover:scale-100 hidden md:flex">
              <Heart className="w-2 h-2 text-white" />
            </div>
            
            <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-church-blue-500 rounded-full items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-0 group-hover:scale-100 hidden md:flex" style={{ transitionDelay: '100ms' }}>
              <Sparkles className="w-1 h-1 text-white" />
            </div>
          </div>
          
          {/* Nombre completo adaptativo */}
          <div className="ml-3 min-w-0">
            {/* Desktop: Nombre completo en dos líneas */}
            <div className="hidden md:block">
              <div className="flex flex-col">
                <span className="text-lg font-bold text-church-blue-900 group-hover:text-church-blue-700 transition-colors duration-300 leading-tight">
                  Igreja Batista Renovada
                </span>
                <span className="text-base font-semibold text-church-gold-600 group-hover:text-church-gold-500 transition-colors duration-300 leading-tight">
                  Sonho de Deus
                </span>
              </div>
            </div>
            
            {/* Tablet: Una línea con nombre completo */}
            <div className="hidden sm:block md:hidden">
              <span className="text-base font-bold text-church-blue-900 group-hover:text-church-gold-600 transition-colors duration-300">
                Igreja Batista Renovada Sonho de Deus
              </span>
            </div>
            
            {/* Móvil: Versión compacta pero completa */}
            <div className="block sm:hidden">
              <div className="flex flex-col">
                <span className="text-sm font-bold text-church-blue-900 group-hover:text-church-blue-700 transition-colors duration-300 leading-tight">
                  Igreja Batista Renovada
                </span>
                <span className="text-xs font-semibold text-church-gold-600 group-hover:text-church-gold-500 transition-colors duration-300 leading-tight">
                  Sonho de Deus
                </span>
              </div>
            </div>
          </div>
        </Link>

        {/* Redes Sociales - Móvil: Centro, Desktop: Después del Navigation */}
        <div className={`flex items-center space-x-3 transition-all duration-500 ease-out delay-100 md:hidden ${
          isLoaded ? 'transform translate-y-0 opacity-100' : 'transform translate-y-4 opacity-0'
        }`}>
          <Link
            href="https://www.facebook.com/share/19RS1iXiJo/"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative p-2 bg-church-blue-100/70 rounded-lg hover:bg-church-blue-600 transition-all duration-300 transform hover:scale-110"
            aria-label="Facebook"
          >
            <Facebook className="w-4 h-4 text-church-blue-600 group-hover:text-white transition-colors duration-300" />
            <div className="absolute inset-0 bg-church-gold-500 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          </Link>
          
          <Link
            href="https://www.instagram.com/ibr_sonhodedeus?igsh=MXY0OWx3Nzk1dGo1NA=="
            target="_blank"
            rel="noopener noreferrer"
            className="group relative p-2 bg-church-blue-100/70 rounded-lg hover:bg-church-blue-600 transition-all duration-300 transform hover:scale-110"
            aria-label="Instagram"
          >
            <Instagram className="w-4 h-4 text-church-blue-600 group-hover:text-white transition-colors duration-300" />
            <div className="absolute inset-0 bg-church-gold-500 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          </Link>
        </div>

        <div className={`flex items-center space-x-4 transition-all duration-500 ease-out delay-200 ${
          isLoaded ? '' : 'transform translate-x-8 opacity-0'
        }`}>
          <Navigation />
          
          {/* Redes Sociales - Solo Desktop */}
          <div className="hidden md:flex items-center space-x-2 pl-4 border-l border-church-sky-200">
            <Link
              href="https://www.facebook.com/share/19RS1iXiJo/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative p-2 bg-church-blue-100/70 rounded-lg hover:bg-church-blue-600 transition-all duration-300 transform hover:scale-110"
              aria-label="Facebook"
            >
              <Facebook className="w-4 h-4 text-church-blue-600 group-hover:text-white transition-colors duration-300" />
              <div className="absolute inset-0 bg-church-gold-500 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </Link>
            
            <Link
              href="https://www.instagram.com/ibr_sonhodedeus?igsh=MXY0OWx3Nzk1dGo1NA=="
              target="_blank"
              rel="noopener noreferrer"
              className="group relative p-2 bg-church-blue-100/70 rounded-lg hover:bg-church-blue-600 transition-all duration-300 transform hover:scale-110"
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4 text-church-blue-600 group-hover:text-white transition-colors duration-300" />
              <div className="absolute inset-0 bg-church-gold-500 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </Link>
          </div>
        </div>
      </div>

      {/* Barra gradiente decorativa */}
      <div className={`h-1 bg-gradient-to-r from-church-blue-500 via-church-gold-400 to-church-blue-500 transition-all duration-300 ${
        isScrolled ? 'opacity-100' : 'opacity-0'
      }`}></div>
    </header>
  );
}