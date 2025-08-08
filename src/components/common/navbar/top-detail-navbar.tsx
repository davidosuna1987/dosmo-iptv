
"use client"

import { useRouter } from "next/navigation";
import { ChevronLeft, Cast } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TopNavbarWrapper } from "./top-navbar-wrapper";

export function TopDetailNavbar() {
  const router = useRouter();

  return (
    <TopNavbarWrapper className="flex items-center justify-between">
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
    </TopNavbarWrapper>
  );
}

