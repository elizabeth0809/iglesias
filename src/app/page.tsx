
import { CarruselImagenComponents } from "@/components/sections/home/CarruselImagen";
import { FormularioComponent } from "@/components/sections/home/formulario";
import { VersiculoDelDia } from "@/components/sections/home/VersiculoDelDia";
import { TestimonioSection } from "@/components/sections/home/TestimonioSection";

import { EventosCarousel } from "@/components/sections/eventos/eventos.components";
import { SermonesCarousel } from "@/components/sections/sermones/sermones.components";
import { BlogsCarousel } from "@/components/sections/blog/blog-carousel.components";

import { blogGetAllAction } from "@/insfractucture/actions/blogs/get-blogs.actions";
import { GetEventosAllAction } from "@/insfractucture/actions/eventos/get-eventos.actions";
import { getAllSermonsAction } from "@/insfractucture/actions/sermones/get-all-sermones.actions";


async function getHomePageData() {
  try {
    const [blogsResult, eventosResult, sermonesResult] = await Promise.allSettled([
      blogGetAllAction({ page: 1 }),
      GetEventosAllAction({ page: 1 }),
      getAllSermonsAction(),
    ]);

    return {
      blogs: blogsResult.status === 'fulfilled' ? blogsResult.value.slice(0, 6) : [],
      eventos: eventosResult.status === 'fulfilled' ? eventosResult.value.slice(0, 6) : [],
      sermones: sermonesResult.status === 'fulfilled' ? sermonesResult.value.slice(0, 6) : [],
    };
  } catch (error) {
    console.error('Error fetching homepage data:', error);
    return {
      blogs: [],
      eventos: [],
      sermones: [],
    };
  }
}

export default async function Home() {
 
  const { blogs, eventos, sermones } = await getHomePageData();

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] bg-gray-900 text-white flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/hero/hero-imagen.png')",
          }}
        ></div>
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="md:text-6xl font-bold mb-4 font-serif text-4xl text-white">
            Bem-vindo à Nossa Igreja
          </h1>
          <p className="text-xl md:text-2xl mb-8 font-sans text-muted-foreground text-white">
            Um lugar de Fé, Esperança e Amor
          </p>
        </div>
      </section>

      {/* Ahora puedes cambiar el orden como quieras */}
      
      {/* Próximos Eventos Carousel */}
      <EventosCarousel eventos={eventos} />

      {/* Testimonio Carrusel */}
      <TestimonioSection />

      {/* Últimos Sermones Carousel */}
      <SermonesCarousel sermones={sermones} />

      {/* Versículo del Día */}
      <VersiculoDelDia />

      {/* Últimas Entradas del Blog Carousel */}
      <BlogsCarousel blogs={blogs} />
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