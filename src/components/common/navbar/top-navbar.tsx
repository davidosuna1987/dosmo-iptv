"use client"

import { useEffect, useRef, useState } from "react";
import { X, RefreshCw, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DosmoIptvLogo } from "../dosmo-iptv-logo";
import Link from "next/link";
import { Input } from "@/components/ui/input";

type TopNavbarProps = {
  title?: string;
  searchLink?: string;
  onInputChanged?: (value: string) => void;
};

const DEFAULT_TITLE = 'DOSMO IPTV';

export function TopNavbar({ title = DEFAULT_TITLE, searchLink, onInputChanged }: TopNavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [isSearchInputVisible, setIsSearchInputVisible] = useState(!searchLink);
  const [searchInputValue, setSearchInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const setInputFocus = () => {
    inputRef.current?.focus();
  };

  const handleShowSearchInput = () => {
    setIsSearchInputVisible(true);
    setTimeout(() => setInputFocus(), 100);
  };

  const handleHideSearchInput = () => {
    setIsSearchInputVisible(false);
    setSearchInputValue("");

    if (typeof onInputChanged === "function") {
      onInputChanged("");
    }
  };

  const handleInputChange = () => {
    if (searchLink) {
      return;
    }

    setSearchInputValue(inputRef.current?.value || "");

    if (typeof onInputChanged === "function") {
      onInputChanged(inputRef.current?.value || "");
    }
  }

  const handleInputKeydown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape") {
      handleHideSearchInput();
    }
  }

  useEffect(() => {
    if (!searchLink) {
      setInputFocus();
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const showNavbarTitle = searchLink || !isSearchInputVisible

  const placeholder = title === DEFAULT_TITLE ? 'Buscar' : `Buscar en ${title.toLowerCase()}`

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
        { showNavbarTitle && <span>{title}</span> }
      </h1>
      { searchLink ?
        (
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              aria-label="Refrescar"
              className="group"
            >
              <RefreshCw className="size-6 group-hover:rotate-180 transition-all transform" />
            </Button>
            <Link href={searchLink}>
              <Button variant="ghost" size="icon" aria-label="Buscar">
                <Search className="size-6" />
              </Button>
            </Link>
          </div>
        ) : isSearchInputVisible ?
        (
          <div className="flex items-center gap-2 flex-1 ml-3">
            <Input ref={inputRef} value={searchInputValue} onChange={handleInputChange} placeholder={placeholder} onKeyDown={handleInputKeydown} />
            <Button
              variant="ghost"
              size="icon"
              aria-label="Cerrar"
              className="group"
              onClick={handleHideSearchInput}
            >
              <X />
            </Button>
          </div>
        ) : 
        (
          <Button variant="ghost" size="icon" aria-label="Buscar" onClick={handleShowSearchInput}>
            <Search className="size-6" />
          </Button>
        )
      }
    </div>
  );
}
