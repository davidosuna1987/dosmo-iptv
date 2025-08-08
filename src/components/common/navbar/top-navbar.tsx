"use client"

import { useEffect, useRef, useState } from "react";
import { X, RefreshCw, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DosmoIptvLogo } from "../dosmo-iptv-logo";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { TopNavbarWrapper } from "./top-navbar-wrapper";

type TopNavbarProps = {
  title?: string;
  searchLink?: string;
  onInputChanged?: (value: string) => void;
};

const DEFAULT_TITLE = 'DOSMO IPTV';

export function TopNavbar({ title = DEFAULT_TITLE, searchLink, onInputChanged }: TopNavbarProps) {
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
  }, []);

  const showNavbarTitle = searchLink || !isSearchInputVisible

  const placeholder = title === DEFAULT_TITLE ? 'Buscar' : `Buscar en ${title.toLowerCase()}`

  return (
    <TopNavbarWrapper className="flex items-center justify-between">
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
    </TopNavbarWrapper>
  );
}
