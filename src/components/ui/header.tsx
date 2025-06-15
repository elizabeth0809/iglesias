import Link from "next/link";
import Image from "next/image";
import { Navigation } from "../Navigate";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center space-x-3">
          <Image 
            src="/logo.jpg" 
            alt="Logo" 
            width={40}
            height={40}
            className="rounded-full" 
          />
        </Link>
        <Navigation />
      </div>
    </header>
  );
}