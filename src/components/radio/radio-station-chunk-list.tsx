'use client';
import { useEffect, useState } from 'react';
import type { XtreamRadioStation } from '@/domain/radio';
import { RadioStationListItem } from './radio-station-list-item';

interface ListProps {
  title?: string;
  items: XtreamRadioStation[];
  chunkSize?: number;
}

const DEFAULT_CHUNK = 60;

export function RadioStationChunkList({ title, items, chunkSize = DEFAULT_CHUNK }: ListProps) {
  const [visibleCount, setVisibleCount] = useState(chunkSize);

  // reset cuando cambian items (ej: filtro)
  useEffect(() => {
    setVisibleCount(chunkSize);
  }, [items, chunkSize]);

  // scroll infinito
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 120) {
        setVisibleCount((prev) => Math.min(prev + chunkSize, items.length));
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [items.length, chunkSize]);

  return (
    <section className="pt-16">
      {title && <h2 className="text-2xl font-semibold mb-4">{title}</h2>}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 md:gap-6 lg:gap-8">
        {items.slice(0, visibleCount).map((item) => (
          <RadioStationListItem key={item.id} item={item} />
        ))}
      </div>
      {visibleCount < items.length && (
        <p className="text-center text-xs text-muted-foreground mt-4">Desplázate para cargar más…</p>
      )}
    </section>
  );
}