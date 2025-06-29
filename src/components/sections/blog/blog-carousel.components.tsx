"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, CalendarIcon } from "lucide-react";
import { IBlogResponse } from "@/insfractucture/interfaces/blogs/blog.interfaces";

interface BlogsCarouselProps {
  blogs: IBlogResponse[];
}

export function BlogsCarousel({ blogs }: BlogsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState(3);

  useEffect(() => {
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
    return new Date(dateString).toLocaleDateString('es-ES', {
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
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Últimas Entradas del Blog</h2>
          <div className="text-center text-gray-500">
            No hay entradas disponibles
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Últimas Entradas del Blog</h2>
          <Link href="/blog" className="text-blue-600 hover:text-blue-800 font-medium">
            Ver todas →
          </Link>
        </div>

        <div className="relative w-full overflow-hidden">
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / visibleItems)}%)`,
            }}
          >
            {blogs.map((post) => (
              <div
                key={post.id}
                className="px-3 flex-shrink-0"
                style={{ width: `${100 / visibleItems}%` }}
              >
                <Link href={`/blog/${post.slug}`} className="block group">
                  <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 group-hover:shadow-lg group-hover:-translate-y-1">
                    <div className="relative h-64 md:h-72 lg:h-80 overflow-hidden">
                      <Image
                        src={post.image || "/placeholder.svg"}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                    <div className="p-5">
                      <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
                        {post.title}
                      </h3>
                      <div className="flex items-center text-gray-500 mb-3">
                        <CalendarIcon className="h-4 w-4 mr-2" />
                        <span className="text-sm">
                          {formatDate(post.created_at)}
                        </span>
                      </div>
                      <p className="text-gray-600 line-clamp-3">
                        {post.description}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          {blogs.length > visibleItems && (
            <>
              <Button
                variant="outline"
                size="icon"
                className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/70 hover:bg-white transition z-10"
                onClick={prevSlide}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/70 hover:bg-white transition z-10"
                onClick={nextSlide}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </>
          )}

          {blogs.length > visibleItems && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {Array.from({ length: blogs.length - (visibleItems - 1) }).map(
                (_, index) => (
                  <button
                    key={index}
                    className={`w-3 h-3 rounded-full transition ${
                      index === currentIndex ? "bg-blue-600" : "bg-gray-400"
                    }`}
                    onClick={() => setCurrentIndex(index)}
                  />
                )
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}