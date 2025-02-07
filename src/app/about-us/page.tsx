import Creemos from "@/components/Creemos";
import MisionVision from "@/components/MisionVision";
import NuestraHistoria from "@/components/NuestraHistoria";
import PastoresLideres from "@/components/PastoresLiderez";
import Testimonios from "@/components/Testimonio";

export default function SobreNosotros() {
  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Sobre Nosotros</h1>
        <NuestraHistoria />
        <Creemos />
        <MisionVision />
        <PastoresLideres />
        <Testimonios />
      </div>
    </main>
  );
}
