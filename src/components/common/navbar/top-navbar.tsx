"use client"

import { useEffect, useState } from "react";
import { RefreshCw, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DosmoIptvLogo } from "../dosmo-iptv-logo";

export function TopNavbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 w-full flex items-center justify-between px-3 md:px-6 py-2 transition-colors duration-300 ${
        scrolled
          ? "bg-black/90 backdrop-blur-sm border-b border-white/25"
          : "bg-transparent border-transparent"
      }`}
    >
      <h1 className="text-lg font-bold flex items-center gap-2">
        <DosmoIptvLogo className="w-8" />
        DOSMO IPTV
      </h1>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          aria-label="Refrescar"
          className="group"
        >
          <RefreshCw className="size-6 group-hover:rotate-180 transition-all transform" />
        </Button>
        <Button variant="ghost" size="icon" aria-label="Buscar">
          <Search className="size-6" />
        </Button>
      </div>
    </div>
  );
}
