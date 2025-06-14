// src/app/page.tsx
import { CarruselImagenComponents } from "@/components/sections/home/CarruselImagen";
import { FormularioComponent } from "@/components/sections/home/formulario";
import { VersiculoDelDia } from "@/components/sections/home/VersiculoDelDia";
import { TestimonioSection } from "@/components/sections/home/TestimonioSection";
import { ProximosEventosSection } from "@/components/sections/home/ProximosEventosSection";
import { HomeCarouselsSection } from "@/components/sections/home/home.components";


// Importar componentes que se cargan del cliente


export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] bg-gray-900 text-white flex items-center justify-center">
        {/* Imagen de fondo */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/hero/hero-imagen.png')",
          }}
        ></div>

        {/* Capa negra encima para contraste */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Contenido del hero */}
        <div className="relative z-10 text-center px-4">
          <h1 className="md:text-6xl font-bold mb-4 font-serif text-4xl text-white">
            Bem-vindo à Nossa Igreja
          </h1>
          <p className="text-xl md:text-2xl mb-8 font-sans text-muted-foreground text-white">
            Um lugar de Fé, Esperança e Amor
          </p>
        </div>
      </section>

      {/* Sección de Carrouseles que se carga del cliente */}
      <HomeCarouselsSection />

      {/* Testimonio Carrusel */}
      <TestimonioSection />

      {/* Versículo del Día */}
      <VersiculoDelDia />

      {/* Carrusel de Imágenes */}
      <CarruselImagenComponents />

      {/* Formulario de Contacto */}
      <FormularioComponent />
    </main>
  );
}

// Metadata para SEO
export const metadata = {
  title: 'Inicio - Nossa Igreja',
  description: 'Bem-vindo à nossa igreja - Um lugar de Fé, Esperança e Amor. Descubre nuestros blogs, eventos y sermones.',
};