'use client';

import Link from 'next/link';
import { CalendarIcon } from 'lucide-react';
import { IBlogResponse } from '@/insfractucture/interfaces/blogs/blog.interfaces';
import { useEffect, useState } from 'react';

interface EntradasBlogsComponentProps {
  blogs: IBlogResponse[];
}

export const EntradasBlogsComponent = ({ blogs }: EntradasBlogsComponentProps) => {
  const [mounted, setMounted] = useState(false);

  // Evitar problemas de hidratación
  useEffect(() => {
    setMounted(true);
  }, []);

  const formatDate = (dateString: string) => {
    if (!mounted) return ''; // Evitar diferencias servidor/cliente
    
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (!mounted) {
    // Renderizar version simplificada en servidor
    return (
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-8">Últimas Entradas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((post) => (
            <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5">
                <h3 className="text-xl font-semibold mb-2">
                  {post.title}
                </h3>
                <p className="text-gray-600 line-clamp-3">
                  {post.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-8">Últimas Entradas</h2>

      {(!blogs || blogs.length === 0) ? (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            No hay entradas disponibles
          </h3>
          <p className="text-gray-500">
            Las entradas del blog aparecerán aquí cuando estén disponibles.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.id}`}
              className="block group"
            >
              <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 group-hover:shadow-lg group-hover:-translate-y-1">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder.svg";
                    }}
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
          ))}
        </div>
      )}
    </div>
  );
};