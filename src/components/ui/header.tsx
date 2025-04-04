import Link from "next/link";
import { Navigation } from "../Navigate";
import { Church } from "lucide-react";


export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center space-x-3">
          <Church className="h-6 w-6 text-primary" />
          <span className="font-semibold text-lg md:text-xl ">
          Senho de Deus
          </span>
        </Link>
        <Navigation />
      </div>
    </header>
  );
}
