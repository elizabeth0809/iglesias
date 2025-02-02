import Image from "next/image";

export default function HeroSection() {
  return (
    <div className="relative h-[50vh] w-full">
      <Image
        src="/placeholder.svg?height=600&width=1200"
        alt="Imagen inspiradora"
        layout="fill"
        objectFit="cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white">
        <h1 className="text-4xl font-bold mb-4">
          Bienvenido a Nuestra Iglesia
        </h1>
        <p className="text-xl">
          Horarios de Servicios: Domingos 9:00 AM y 11:00 AM
        </p>
      </div>
    </div>
  );
}
