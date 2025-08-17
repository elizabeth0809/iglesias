import { NossaDoacoesComponent } from "./components/NossaDoacoesComponent";


export default function DoacoesPage() {
  return (
    <div suppressHydrationWarning={true}>
      <NossaDoacoesComponent />
    </div>
  );
}

export const metadata = {
  title: 'Doações - Igreja Batista Renovada Sonho de Deus',
  description: 'Contribua para a obra de Deus. Que cada um dê como propôs em seu coração, não de mala gana nem por obrigação.',
  keywords: 'doações, contribuição, igreja batista, ofertas, dizimo, contribuir',
  openGraph: {
    title: 'Doações - Igreja Batista Renovada Sonho de Deus',
    description: 'Contribua para a obra de Deus. Que cada um dê como propôs em seu coração.',
    type: 'website',
  },
};