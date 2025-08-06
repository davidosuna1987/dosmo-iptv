"use client";

import { useEffect, useState } from "react";
import { LiveStreamListItem } from "./live-stream-list-item";
import { XtreamPreview } from "@/domain/xtream";

interface ListProps {
  title?: string;
  items: XtreamPreview[];
  chunkSize?: number; 
}

const MAX_VISIBLE_COUNT = 50;

export function LiveStreamChunkList({ title, items, chunkSize = MAX_VISIBLE_COUNT }: ListProps) {
  const [visibleCount, setVisibleCount] = useState(chunkSize);

  // 🔹 resetear cuando cambien los items (ej: nuevo filtro)
  useEffect(() => {
    setVisibleCount(chunkSize);
  }, [items, chunkSize]);

  // 🔹 aumentar al hacer scroll
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 100
      ) {
        setVisibleCount((prev) => Math.min(prev + chunkSize, items.length));
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [items.length, chunkSize]);

  return (
    <section className="pt-16">
      {title && <h2 className="text-2xl font-semibold mb-4">{title}</h2>}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 md:gap-6 lg:gap-8">
        {items.slice(0, visibleCount).map((item) => (
          <LiveStreamListItem key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
