
"use client"

import { useRouter } from "next/navigation";
import { ChevronLeft, Cast } from "lucide-react";
import { Button } from "@/components/ui/button";

export function TopDetailNavbar() {
  const router = useRouter();

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 w-full flex items-center justify-between px-3 md:px-6 py-2 transition-colors duration-300 bg-black/90 backdrop-blur-sm border-b border-white/25"
    >
      <Button
        variant="ghost"
        size="icon"
        aria-label="Volver"
        onClick={() => router.back()}
      >
        <ChevronLeft className="size-7" />
      </Button>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" aria-label="Cast">
          <Cast className="size-6" />
        </Button>
      </div>
    </div>
  );
}

