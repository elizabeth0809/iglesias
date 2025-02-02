import HeroSection from "@/components/HeroSection";
import NoticiasRecientes from "@/components/NoticiasSection";
import QuickLinks from "@/components/QuickLink";
import RedesSociales from "@/components/RedesSociales";
import VersiculoDelDia from "@/components/VersiculoDelDia";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <HeroSection />
      <div className="container mx-auto px-4 py-8">
        <QuickLinks />
        <VersiculoDelDia />
        <NoticiasRecientes />
        <RedesSociales />
      </div>
    </main>
  );
}
