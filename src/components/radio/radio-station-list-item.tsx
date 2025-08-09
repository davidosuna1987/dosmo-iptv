'use client';
import Image from 'next/image';
import Link from 'next/link';
import type { XtreamRadioStation } from '@/domain/radio';
import { safeUrl } from '@/domain/url';

function fallbackFavicon(name: string) {
  // usa un generador de favicon por inicial si no hay logo
  const letter = name?.[0] || 'R';
  return `https://placehold.co/200/black/white?text=${letter}`;
}

export function RadioStationListItem({ item }: { item: XtreamRadioStation }) {
  const cover = safeUrl(decodeURIComponent(item.favicon || fallbackFavicon(item.name))).trim();
  // Si quieres una página de detalle de radio: /radio/[id]
  const detailUrl = `/radio/${encodeURIComponent(item.id)}`;

  return (
    <Link href={detailUrl} className="list-item relative w-full flex-shrink-0 snap-start overflow-hidden group">
      <div className="aspect-square w-full overflow-hidden rounded-md bg-black/40">
        <Image
          src={cover}
          alt={item.name}
          width={200}
          height={200}
          className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-200"
          unoptimized
        />
      </div>
      <div className="absolute bottom-0 left-0 w-full bg-black/80 group h-12 flex items-center px-2 pt-1">
        <p className="text-xs font-semibold line-clamp-2 group-hover:text-primary">{item.name}</p>
      </div>
    </Link>
  );
}