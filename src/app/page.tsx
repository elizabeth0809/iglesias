
import { FormularioComponent } from "@/components/sections/home/formulario";
import { VersiculoDelDia } from "@/components/sections/home/VersiculoDelDia";
import { TestimonioSection } from "@/components/sections/home/TestimonioSection";

import { EventosCarousel } from "@/components/sections/eventos/eventos.components";
import { SermonesCarousel } from "@/components/sections/sermones/sermones.components";
import { BlogsCarousel } from "@/components/sections/blog/blog-carousel.components";

import { blogGetAllAction } from "@/insfractucture/actions/blogs/get-blogs.actions";
import { GetEventosAllAction } from "@/insfractucture/actions/eventos/get-eventos.actions";
import { getAllSermonsAction } from "@/insfractucture/actions/sermones/get-all-sermones.actions";
import { CarruselImagenComponents } from "@/components/sections/home/CarruselImagen";
import {  LocationSectionComplete } from "@/components/sections/mapa/mapa-section";

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
      // ↓ Mudança aqui: acessar o conteúdo do array se necessário
      sermones: sermonesResult.status === 'fulfilled'
        ? (Array.isArray(sermonesResult.value[0])
          ? sermonesResult.value[0].slice(0, 6)
          : sermonesResult.value.slice(0, 6))
        : [],
    };
  } catch (error) {
    console.error('Erro ao buscar dados da página inicial:', error);
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
      {/* Seção Hero */}
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

      {/* Carrossel de Próximos Eventos */}
      <EventosCarousel eventos={eventos} />

      {/* Carrossel de Últimos Sermões */}
      <SermonesCarousel sermones={sermones} />

      {/* Seção de Testemunhos */}
      <TestimonioSection />

      {/* Versículo do Dia */}
      <VersiculoDelDia />

      {/* Carrossel de Últimas Entradas do Blog */}
      <BlogsCarousel blogs={blogs} />
      <CarruselImagenComponents />

      {/* Formulário de Contato */}
      <FormularioComponent />
      <LocationSectionComplete />
    </main>
  );
}
export const metadata = {
  title: 'Início - Nossa Igreja',
  description: 'Bem-vindo à nossa igreja - Um lugar de Fé, Esperança e Amor. Descubra nossos blogs, eventos e sermões.',
};