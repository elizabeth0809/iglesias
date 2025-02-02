import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Youtube } from "lucide-react";

export default function RedesSociales() {
  return (
    <div className="flex justify-center space-x-4">
      <Button variant="outline" size="icon">
        <Facebook className="h-4 w-4" />
      </Button>
      <Button variant="outline" size="icon">
        <Instagram className="h-4 w-4" />
      </Button>
      <Button variant="outline" size="icon">
        <Youtube className="h-4 w-4" />
      </Button>
    </div>
  );
}
