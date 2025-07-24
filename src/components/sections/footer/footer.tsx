"use client";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Clock, Facebook, Instagram, Heart, Phone, Mail, ChevronRight, Star } from "lucide-react";
import { useState, useEffect } from "react";

const navItems = [
  { href: "/", label: "Início" },
  { href: "/eventos", label: "Atividades" },
  { href: "/blog", label: "Blogs" },
  { href: "/sermones", label: "Sermões" },
];

export function Footer() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <footer className="bg-gradient-to-br from-church-blue-900 via-church-blue-800 to-black text-white relative overflow-hidden">
      {/* Decoración de fondo */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-church-gold-400 rounded-full animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 bg-church-red-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-church-sky-400 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Pattern de fondo sutil */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
        backgroundSize: '20px 20px'
      }}></div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Logo e Descrição */}
          <div className={`space-y-6 transition-all duration-1000 ease-out ${
            isLoaded ? 'transform translate-y-0 opacity-100' : 'transform translate-y-8 opacity-0'
          }`}>
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <Image 
                  src="/logo.jpg"
                  alt="Logo"
                  width={60}
                  height={60}
                  className="rounded-full shadow-lg group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-church-gold-500 rounded-full flex items-center justify-center">
                  <Heart className="w-3 h-3 text-white" />
                </div>
              </div>
              <div>
                <span className="text-xl font-bold text-white group-hover:text-church-gold-300 transition-colors duration-300">
                  Igreja Batista
                </span>
                <br />
                <span className="text-lg text-church-gold-400">
                  Renovada Sonho de Deus
                </span>
              </div>
            </Link>
            
            <p className="text-church-sky-200 text-sm leading-relaxed">
              Um lugar de fé, esperança e amor. Venha fazer parte da nossa 
              família e crescer espiritualmente conosco em uma jornada de transformação.
            </p>
            
            {/* Redes Sociais Melhoradas */}
            <div className="space-y-3">
              <h4 className="text-church-gold-400 font-semibold text-sm">Conecte-se Conosco</h4>
              <div className="flex space-x-4">
                <Link 
                  href="https://www.facebook.com/share/19RS1iXiJo/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative p-3 bg-church-blue-700/50 rounded-lg hover:bg-church-blue-600 transition-all duration-300 transform hover:scale-110"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5 text-church-sky-200 group-hover:text-white transition-colors duration-300" />
                  <div className="absolute inset-0 bg-church-gold-500 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                </Link>
                <Link 
                  href="https://www.instagram.com/ibr_sonhodedeus?igsh=MXY0OWx3Nzk1dGo1NA=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative p-3 bg-church-blue-700/50 rounded-lg hover:bg-church-blue-600 transition-all duration-300 transform hover:scale-110"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5 text-church-sky-200 group-hover:text-white transition-colors duration-300" />
                  <div className="absolute inset-0 bg-church-gold-500 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                </Link>
              </div>
            </div>
          </div>

          {/* Navegação Melhorada */}
          <div className={`space-y-6 transition-all duration-1000 ease-out delay-200 ${
            isLoaded ? 'transform translate-y-0 opacity-100' : 'transform translate-y-8 opacity-0'
          }`}>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-church-gold-500 rounded-lg flex items-center justify-center">
                <ChevronRight className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-church-gold-400">Navegação</h3>
            </div>
            <ul className="space-y-3">
              {navItems.map((item, index) => (
                <li key={item.href}>
                  <Link 
                    href={item.href}
                    className="group flex items-center space-x-3 text-church-sky-200 hover:text-white transition-all duration-300 text-sm py-2"
                  >
                    <div className="w-2 h-2 bg-church-gold-400 rounded-full group-hover:scale-150 transition-transform duration-300"></div>
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      {item.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            
            {/* Call to action */}
            <div className="mt-6 p-4 bg-church-blue-700/30 rounded-lg border border-church-blue-600">
              <p className="text-church-sky-200 text-sm mb-2">
                ✨ Primeira visita?
              </p>
              <Link 
                href="/eventos"
                className="text-church-gold-400 text-sm font-medium hover:text-church-gold-300 transition-colors duration-300"
              >
                Conheça nossas atividades →
              </Link>
            </div>
          </div>

          {/* Contato Melhorado */}
          <div className={`space-y-6 transition-all duration-1000 ease-out delay-300 ${
            isLoaded ? 'transform translate-y-0 opacity-100' : 'transform translate-y-8 opacity-0'
          }`}>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-church-red-500 rounded-lg flex items-center justify-center">
                <MapPin className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-church-gold-400">Localização</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3 p-3 bg-church-blue-700/30 rounded-lg">
                <MapPin className="h-5 w-5 text-church-red-400 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-church-sky-200">
                  <p className="font-medium text-white">Nossa Casa</p>
                  <p>Rua Luis Gomes Pain, nº 300</p>
                  <p>Jardim Marek, Santo André - SP</p>
                  <p>CEP: 09111-580</p>
                </div>
              </div>
              
              {/* Facilidades */}
              
            </div>
          </div>

          {/* Horários Melhorados */}
          <div className={`space-y-6 transition-all duration-1000 ease-out delay-400 ${
            isLoaded ? 'transform translate-y-0 opacity-100' : 'transform translate-y-8 opacity-0'
          }`}>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-church-gold-500 rounded-lg flex items-center justify-center">
                <Clock className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-church-gold-400">Horários dos Cultos</h3>
            </div>
            
            <div className="space-y-4">
              {/* Domingo */}
              <div className="p-3 bg-church-blue-700/30 rounded-lg border border-church-blue-600">
                <p className="font-medium text-church-gold-300 mb-2 flex items-center">
                  <span className="text-lg mr-2">🌅</span> Domingo
                </p>
                <div className="text-sm text-church-sky-200 space-y-1 ml-6">
                  <p>8h - Consagração</p>
                  <p>9h - EBD</p>
                  <p>18h - Culto</p>
                </div>
              </div>
              
              {/* Durante a semana */}
              <div className="p-3 bg-church-blue-700/30 rounded-lg border border-church-blue-600">
                <p className="font-medium text-church-gold-300 mb-2 flex items-center">
                  <span className="text-lg mr-2">📅</span> Durante a Semana
                </p>
                <div className="text-sm text-church-sky-200 space-y-1 ml-6">
                  <p>Segunda: 19h30 (Estudo)</p>
                  <p>Quarta: 19h30 (Culto)</p>
                  <p>Sexta: 19h30 (Culto)</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Seção inferior melhorada */}
        <div className={`border-t border-church-blue-600 mt-12 pt-8 transition-all duration-1000 ease-out delay-500 ${
          isLoaded ? 'transform translate-y-0 opacity-100' : 'transform translate-y-8 opacity-0'
        }`}>
          {/* Quote inspiracional */}
          <div className="text-center mb-8">
            <p className="text-church-gold-300 italic text-lg mb-2">
              "Eu e a minha casa serviremos ao Senhor"
            </p>
            <p className="text-church-sky-300 text-sm">Josué 24:15</p>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-church-sky-300">
              © {new Date().getFullYear()} Igreja Batista Renovada Sonho de Deus. Todos os direitos reservados.
            </p>
            
            <div className="flex items-center space-x-4 text-sm text-church-sky-300">
              <p className="flex items-center">
                Feito com <Heart className="w-4 h-4 text-church-red-400 mx-1" /> para nossa família
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Versão mais simples melhorada
export function SimpleFooter() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <footer className="bg-gradient-to-r from-church-blue-900 to-church-blue-800 text-white py-12 relative overflow-hidden">
      {/* Decoración sutil */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
        backgroundSize: '20px 20px'
      }}></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 transition-all duration-1000 ease-out ${
          isLoaded ? 'transform translate-y-0 opacity-100' : 'transform translate-y-8 opacity-0'
        }`}>
          
          {/* Logo */}
          <div className="text-center md:text-left">
            <Link href="/" className="flex items-center justify-center md:justify-start space-x-3 group">
              <Image 
                src="/logo.jpg"
                alt="Logo"
                width={50}
                height={50}
                className="rounded-full shadow-lg group-hover:scale-110 transition-transform duration-300"
              />
              <div>
                <span className="text-xl font-bold text-white group-hover:text-church-gold-300 transition-colors duration-300">
                  Igreja Batista
                </span>
                <br />
                <span className="text-lg text-church-gold-400">
                  Renovada Sonho de Deus
                </span>
              </div>
            </Link>
          </div>

          {/* Navegação */}
          <div className="text-center">
            <h3 className="font-semibold mb-4 text-church-gold-400">Links Rápidos</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {navItems.map((item) => (
                <Link 
                  key={item.href}
                  href={item.href}
                  className="text-church-sky-200 hover:text-white transition-colors duration-300 text-sm hover:scale-105 transform"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contato */}
          <div className="text-center md:text-right">
            <h3 className="font-semibold mb-4 text-church-gold-400">Localização</h3>
            <div className="space-y-2 text-sm text-church-sky-200">
              <p>Jardim Marek</p>
              <p>Santo André - SP</p>
              <p className="text-church-gold-300">Te esperamos! 💝</p>
            </div>
          </div>
        </div>

        <div className="border-t border-church-blue-600 mt-8 pt-6 text-center">
          <p className="text-sm text-church-sky-300 mb-2">
            © {new Date().getFullYear()} Igreja Batista Renovada Sonho de Deus. Todos os direitos reservados.
          </p>
          <p className="text-church-gold-300 italic text-sm">
            "Eu e a minha casa serviremos ao Senhor" - Josué 24:15
          </p>
        </div>
      </div>
    </footer>
  );
}