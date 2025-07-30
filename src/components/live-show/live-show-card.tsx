import Image from 'next/image';
import type { LiveShowItem } from '@/lib/data';

interface LiveShowCardProps {
  item: LiveShowItem;
}

export function LiveShowCard({ item }: LiveShowCardProps) {
  return (
    <div className="w-[30%] bg-secondary flex-shrink-0 snap-start flex flex-col gap-2 group rounded-lg overflow-hidden">
      <div className="aspect-square flex items-center justify-center overflow-hidden bg-secondary">
        <Image
          src="https://picsum.photos/200/300.webp"
          alt={item.title}
          width={300}
          height={300}
          className="object-cover size-full group-hover:scale-110 transition-transform duration-200"
          data-ai-hint="channel logo"
        />
      </div>
      <p className="text-center text-xs font-semibold truncate mt-2 mb-3">{item.title}</p>
    </div>
  );
}
