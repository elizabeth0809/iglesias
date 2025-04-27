import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Clock, ChevronRight } from "lucide-react";
import { TestimonialCarousel } from "./components/TestimonialCarousel";
import { ImageCarousel } from "./components/ImageCarousel";
import { CarruselImagenComponents } from "@/components/sections/home/CarruselImagen";
import { EnlacesRapidos } from "@/components/sections/home/EnlacesRapidos";
import { FormularioComponent } from "@/components/sections/home/formulario";
import { VideosSermones } from "@/components/sections/home/VideosSermones";
import { VersiculoDelDia } from "@/components/sections/home/VersiculoDelDia";
import { TestimonioSection } from "@/components/sections/home/TestimonioSection";
import { ProximosEventosSection } from "@/components/sections/home/ProximosEventosSection";

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
          <h1 className=" md:text-6xl font-bold mb-4 font-serif text-4xl text-white">
            Bem-vindo à Nossa Igreja
          </h1>
          <p className="text-xl md:text-2xl mb-8 font-sans text-muted-foreground text-white">
            Um lugar de Fé, Esperança e Amor
          </p>
          {/* <Button asChild size="lg">
            <Link href="/sobre-nosotros">Conócenos</Link>
          </Button> */}
        </div>
      </section>

      {/* Próximos Eventos */}
      <ProximosEventosSection />
      {/* Testimonio Carrusel */}
      <TestimonioSection />

      {/* Versículo del Día */}
      <VersiculoDelDia />

      {/* Videos de Sermones */}
      <VideosSermones />

      {/* Carrusel de Imágenes */}

      <CarruselImagenComponents />
      {/* Enlaces Rápidos */}
      <EnlacesRapidos />

      {/* Formulario de Contacto */}
      <FormularioComponent />
    </main>
  );
}
