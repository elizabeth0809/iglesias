"use client";

import { useEffect, useState } from "react";
import { blogGetAllAction } from "@/insfractucture/actions/blogs/get-blogs.actions";
import { GetEventosAllAction } from "@/insfractucture/actions/eventos/get-eventos.actions";
import { IBlogResponse } from "@/insfractucture/interfaces/blogs/blog.interfaces";
import { IEventoResponse } from "@/insfractucture/interfaces/eventos/eventos.interfaces";
import { SermonResponse } from "@/insfractucture/interfaces/sermones/sermones.interfaces";
import { getAllSermonsAction } from "@/insfractucture/actions/sermones/get-all-sermones.actions";
import { EventosCarousel } from "../eventos/eventos.components";
import { SermonesCarousel } from "../sermones/sermones.components";
import { BlogsCarousel } from "../blog/blog-carousel.components";

interface HomeData {
  blogs: IBlogResponse[];
  eventos: IEventoResponse[];
  sermones: SermonResponse[];
}

export function HomeCarouselsSection() {
  const [data, setData] = useState<HomeData>({
    blogs: [],
    eventos: [],
    sermones: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchHomeData() {
      try {
        setLoading(true);
        setError(null);

        const [blogsResult, eventosResult, sermonesResult] = await Promise.allSettled([
          blogGetAllAction({ page: 1 }),
          GetEventosAllAction({ page: 1 }),
          getAllSermonsAction(),
        ]);

        setData({
          blogs: blogsResult.status === 'fulfilled' ? blogsResult.value.slice(0, 6) : [],
          eventos: eventosResult.status === 'fulfilled' ? eventosResult.value.slice(0, 6) : [],
          sermones: sermonesResult.status === 'fulfilled' ? sermonesResult.value.slice(0, 6) : [],
        });

      } catch (err) {
        console.error('Error fetching homepage data:', err);
        setError('Error al cargar el contenido');
      } finally {
        setLoading(false);
      }
    }

    fetchHomeData();
  }, []);

  if (loading) {
    return (
      <div className="space-y-16">
        {/* Loading Eventos */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold">Próximos Eventos</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-gray-200 rounded-lg h-64 animate-pulse"></div>
              ))}
            </div>
          </div>
        </section>

        {/* Loading Sermones */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold">Últimos Sermones</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-gray-200 rounded-lg h-64 animate-pulse"></div>
              ))}
            </div>
          </div>
        </section>

        {/* Loading Blogs */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold">Últimas Entradas del Blog</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-gray-200 rounded-lg h-64 animate-pulse"></div>
              ))}
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-600">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Intentar de nuevo
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-0">
      {/* Próximos Eventos Carousel */}
      <EventosCarousel eventos={data.eventos} />

      {/* Últimos Sermones Carousel */}
      <SermonesCarousel sermones={data.sermones} />

      {/* Últimas Entradas del Blog Carousel */}
      <BlogsCarousel blogs={data.blogs} />
    </div>
  );
}