"use client";
import React, { useEffect, useState } from 'react';

const MinimalHero = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative h-[70vh] bg-gray-900 text-white flex items-center justify-center">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out"
        style={{
          backgroundImage: "url('/hero/hero-banner.jpeg')",
          backgroundPosition: "center center",
          backgroundSize: "cover",
          transform: isLoaded ? 'scale(1)' : 'scale(1.05)',
        }}
      />
      
      {/* Enhanced Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-church-blue-900/40 via-church-blue-800/50 to-church-blue-900/60" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl">
        <h1 
          className={`md:text-6xl font-bold mb-6 font-serif text-4xl text-white transition-all duration-1000 ease-out ${
            isLoaded 
              ? 'transform translate-y-0 opacity-100' 
              : 'transform translate-y-8 opacity-0'
          }`}
          style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.6)' }}
        >
          Bem-vindo à Igreja Batista
          <br />
          <span className="text-church-gold-400 font-light">Renovada Sonho de Deus</span>
        </h1>

        <div 
          className={`transition-all duration-1000 ease-out delay-300 ${
            isLoaded 
              ? 'transform translate-y-0 opacity-100' 
              : 'transform translate-y-8 opacity-0'
          }`}
        >
          <p className="text-xl md:text-2xl mb-2 font-light text-gray-100" 
             style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.7)' }}>
            <em>"Eu e a minha casa serviremos ao Senhor"</em>
          </p>
          <p className="text-lg text-church-gold-300 font-medium">Josué 24:15</p>
        </div>

        {/* Simple CTA */}
        <div className={`mt-10 transition-all duration-1000 ease-out delay-500 ${
          isLoaded 
            ? 'transform translate-y-0 opacity-100' 
            : 'transform translate-y-8 opacity-0'
        }`}>
      
        </div>
      </div>
    </section>
  );
};

export default MinimalHero;