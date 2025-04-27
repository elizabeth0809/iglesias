import { TestimonialCarousel } from "@/app/components/TestimonialCarousel";
import React from "react";

export const TestimonioSection = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Testemunhos</h2>
        <TestimonialCarousel />
      </div>
    </section>
  );
};
