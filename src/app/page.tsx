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
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Próximos Eventos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Servicio Dominical",
                date: "Todos los domingos",
                time: "10:00 AM",
                location: "Santuario Principal",
              },
              {
                title: "Estudio Bíblico",
                date: "Miércoles",
                time: "7:00 PM",
                location: "Salón Comunitario",
              },
              {
                title: "Retiro de Jóvenes",
                date: "15-17 de Agosto",
                time: "Todo el día",
                location: "Campamento El Redentor",
              },
            ].map((event, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{event.title}</CardTitle>
                  <CardDescription>{event.date}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="flex items-center">
                    <Clock className="mr-2 h-4 w-4" /> {event.time}
                  </p>
                  <p className="flex items-center mt-2">
                    <MapPin className="mr-2 h-4 w-4" /> {event.location}
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline">Más Información</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonio Carrusel */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Testimonios</h2>
          <TestimonialCarousel />
        </div>
      </section>

      {/* Versículo del Día */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Versículo del Día</h2>
          <blockquote className="text-2xl italic mb-4">
            Porque de tal manera amó Dios al mundo, que ha dado a su Hijo
            unigénito, para que todo aquel que en él cree, no se pierda, mas
            tenga vida eterna.
          </blockquote>
          <cite>— Juan 3:16</cite>
        </div>
      </section>

      {/* Videos de Sermones */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Sermones Recientes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((index) => (
              <div key={index} className="aspect-w-16 aspect-h-9">
                <iframe
                  src={`https://www.youtube.com/embed/-iOgFAe22tY`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full rounded-lg"
                ></iframe>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Carrusel de Imágenes */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Nuestra Comunidad en Imágenes
          </h2>
          <ImageCarousel />
        </div>
      </section>

      {/* Enlaces Rápidos */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Enlaces Rápidos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Sermones",
                description: "Escucha nuestros mensajes más recientes",
                link: "/sermones-medios",
              },
              {
                title: "Ministerios",
                description: "Descubre cómo puedes servir",
                link: "/servicios-actividades",
              },
              {
                title: "Donaciones",
                description: "Apoya nuestra misión",
                link: "/donaciones",
              },
              {
                title: "Contacto",
                description: "Ponte en contacto con nosotros",
                link: "/contacto",
              },
            ].map((item, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{item.title}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button asChild variant="ghost">
                    <Link href={item.link}>
                      Más Información <ChevronRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Formulario de Contacto */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Contáctanos</h2>
          <form className="max-w-md mx-auto space-y-4">
            <div>
              <label
                htmlFor="nombre"
                className="block text-sm font-medium text-gray-700"
              >
                Nombre completo
              </label>
              <Input id="nombre" placeholder="Tu nombre completo" />
            </div>
            <div>
              <label
                htmlFor="whatsapp"
                className="block text-sm font-medium text-gray-700"
              >
                WhatsApp
              </label>
              <Input id="whatsapp" placeholder="Tu número de WhatsApp" />
            </div>
            <div>
              <label
                htmlFor="descripcion"
                className="block text-sm font-medium text-gray-700"
              >
                Descripción
              </label>
              <Textarea
                id="descripcion"
                placeholder="¿En qué podemos ayudarte?"
              />
            </div>
            <Button type="submit" className="w-full">
              Enviar
            </Button>
          </form>
        </div>
      </section>
    </main>
  );
}
