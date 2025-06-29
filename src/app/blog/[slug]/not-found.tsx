import Link from "next/link";
import { ArrowLeft, FileX } from "lucide-react";

export default function BlogNotFound() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="text-center">
          {/* Icono */}
          <div className="flex justify-center mb-6">
            <FileX className="h-24 w-24 text-gray-400" />
          </div>

          {/* Título */}
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Blog no encontrado
          </h1>

          {/* Descripción */}
          <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
            Lo sentimos, la entrada del blog que buscas no existe o ha sido eliminada.
          </p>

          {/* Botones de acción */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/blog"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver al blog
            </Link>

            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
            >
              Ir al inicio
            </Link>
          </div>

          {/* Sugerencias adicionales */}
          <div className="mt-12 p-6 bg-white rounded-lg shadow-sm border max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              ¿Qué puedes hacer?
            </h3>
            <ul className="text-left text-gray-600 space-y-2">
              <li>• Revisa que la URL esté escrita correctamente</li>
              <li>• Explora nuestras últimas entradas del blog</li>
              <li>• Usa el buscador para encontrar contenido relacionado</li>
              <li>• Vuelve a la página principal</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}