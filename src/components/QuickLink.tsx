import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function QuickLinks() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <Link href="/eventos" passHref>
        <Button variant="outline" className="w-full">
          Próximos Eventos
        </Button>
      </Link>
      <Link href="/transmision" passHref>
        <Button variant="outline" className="w-full">
          Transmisión en Vivo
        </Button>
      </Link>
      <Link href="/donaciones" passHref>
        <Button variant="default" className="w-full">
          Donar
        </Button>
      </Link>
    </div>
  );
}
