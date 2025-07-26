"use client";
import Link from "next/link";
import Image from "next/image";
import { Navigation } from "../Navigate";
import { useState, useEffect } from "react";
import { Heart, Sparkles } from "lucide-react";

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
      <div className="container flex h-20 items-center justify-between px-4 md:px-6">
        <Link href="/" className={`flex items-center space-x-4 group transition-all duration-500 ease-out ${
          isLoaded ? 'transform translate-x-0 opacity-100' : 'transform -translate-x-8 opacity-0'
        }`}>
          <div className="relative">
            {/* Logo principal */}
            <div className="relative overflow-hidden rounded-full">
              <Image 
                src="/logo.jpg"
                alt="Logo Igreja Batista Renovada Sonho de Deus"
                width={50}
                height={50}
                className="rounded-full shadow-lg transition-transform duration-300 group-hover:scale-110"
              />
              {/* Overlay sutil en hover */}
              <div className="absolute inset-0 bg-church-gold-400/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            
            {/* Decoraciones flotantes */}
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-church-gold-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-0 group-hover:scale-100">
              <Heart className="w-2 h-2 text-white" />
            </div>
            
            <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-church-blue-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-0 group-hover:scale-100" style={{ transitionDelay: '100ms' }}>
              <Sparkles className="w-1 h-1 text-white" />
            </div>
          </div>
          
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
          
          {/* Versión móvil del nombre */}
          <div className="md:hidden">
            <span className="text-lg font-bold text-church-blue-900 group-hover:text-church-blue-700 transition-colors duration-300">
              IBR Sonho de Deus
            </span>
          </div>
        </Link>

        {/* Navegación */}
        <div className={`transition-all duration-500 ease-out delay-200 ${
          isLoaded ? 'transform translate-x-0 opacity-100' : 'transform translate-x-8 opacity-0'
        }`}>
          <Navigation />
        </div>
      </div>

      <div className={`h-1 bg-gradient-to-r from-church-blue-500 via-church-gold-400 to-church-blue-500 transition-all duration-300 ${
        isScrolled ? 'opacity-100' : 'opacity-0'
      }`}></div>

 
     
    </header>
  );
}

export function MinimalHeader() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/98 backdrop-blur-lg shadow-md' 
        : 'bg-white/95 backdrop-blur-sm'
    } border-b border-church-sky-200`}>
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        
        <Link href="/" className="flex items-center space-x-3 group">
          <Image 
            src="/logo.jpg"
            alt="Logo"
            width={42}
            height={42}
            className="rounded-full shadow-md transition-transform duration-300 group-hover:scale-110"
          />
          <span className="text-xl font-bold text-church-blue-900 group-hover:text-church-gold-600 transition-colors duration-300">
            Igreja Batista Renovada
          </span>
        </Link>
        
        <Navigation />
      </div>
    </header>
  );
}