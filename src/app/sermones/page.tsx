// import BibliotecaMedias from "./components/BibliotecaMedias";
// import SermonesRecientes from "./components/SermonesRecientes";

// export default function SermonesMedias() {
//   return (
//     <main className="min-h-screen bg-white">
//       <div className="container mx-auto px-4 py-8">
//         <h1 className="text-4xl font-bold mb-8 text-center">
//           Sermões e Mídias
//         </h1>
//         <SermonesRecientes />
//         <BibliotecaMedias /> 
//       </div>
//     </main>
//   );
// }

import { Metadata } from 'next';
import { getAllSermonsAction } from '@/insfractucture/actions/sermones/get-all-sermones.actions';
import { SermonResponse } from '@/insfractucture/interfaces/sermones/sermones.interfaces';
import { SermonesListComponent } from './components/SermonesList';

// Esta função executa no servidor
async function getSermones(): Promise<{ sermones: SermonResponse[]; error?: string }> {
  try {
    const sermonesData = await getAllSermonsAction();
        
    // Manejar diferentes formatos de resposta
    const sermones = Array.isArray(sermonesData[0]) ? sermonesData[0] : sermonesData;
        
    return { sermones: Array.isArray(sermones) ? sermones : [] };
  } catch (error) {
    console.error('Erro ao buscar sermões:', error);
    return {
      sermones: [],
      error: 'Erro ao carregar os sermões'
    };
  }
}

interface SermonesPageProps {
  searchParams: Promise<{ page?: string }>; // Para paginação futura
}

export default async function SermonesPage({ searchParams }: SermonesPageProps) {
  
  console.log('SermonesPage renderizada', searchParams);
  const { sermones, error } = await getSermones();

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Erro</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div suppressHydrationWarning={true}>
      <SermonesListComponent sermones={sermones} />
    </div>
  );
}

export const metadata: Metadata = {
  title: 'Sermões | Igreja Batista Renovada Sonho de Deus',
  description: 'Ouça nossos sermões e pregações espirituais. Encontre inspiração e ensinamentos bíblicos.',
  keywords: 'sermões, pregações, igreja, bíblia, ensinamentos, espiritual',
  openGraph: {
    title: 'Sermões | Igreja Batista Renovada Sonho de Deus',
    description: 'Ouça nossos sermões e pregações espirituais. Encontre inspiração e ensinamentos bíblicos.',
    type: 'website',
    url: '/sermones',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sermões | Igreja Batista Renovada Sonho de Deus',
    description: 'Ouça nossos sermões e pregações espirituais.',
  },
};