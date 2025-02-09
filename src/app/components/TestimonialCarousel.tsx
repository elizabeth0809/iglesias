"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    quote:
      "Esta iglesia ha transformado mi vida. Encontré una comunidad amorosa y un propósito más grande.",
    author: "María González",
    role: "Miembro desde 2018",
  },
  {
    quote:
      "Los sermones son inspiradores y relevantes para mi vida diaria. Me siento renovado cada semana.",
    author: "Juan Pérez",
    role: "Miembro desde 2020",
  },
  {
    quote:
      "El programa juvenil ha sido una bendición para mis hijos. Han crecido tanto en su fe.",
    author: "Ana Rodríguez",
    role: "Madre y miembro desde 2015",
  },
];

export function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <div className="relative">
      <Card className="max-w-2xl mx-auto">
        <CardContent className="pt-6">
          <blockquote className="text-xl italic">
            {testimonials[currentIndex].quote}
          </blockquote>
          <footer className="mt-4 text-right">
            <cite>
              — {testimonials[currentIndex].author},{" "}
              {testimonials[currentIndex].role}
            </cite>
          </footer>
        </CardContent>
      </Card>
      <Button
        variant="outline"
        size="icon"
        className="absolute top-1/2 left-0 transform -translate-y-1/2"
        onClick={prevTestimonial}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="absolute top-1/2 right-0 transform -translate-y-1/2"
        onClick={nextTestimonial}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
