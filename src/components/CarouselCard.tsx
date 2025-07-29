import Image from 'next/image';
import type { CarouselItem } from '@/lib/data';

interface CarouselCardProps {
  item: CarouselItem;
}

export function CarouselCard({ item }: CarouselCardProps) {
  const [width, height] = item.posterPath.split('x').map(Number);

  return (
    <div className="w-[31%] flex-shrink-0 snap-start">
      <Image
        src={`https://placehold.co/${item.posterPath}.png`}
        alt={item.title}
        width={width}
        height={height}
        className="object-cover w-full rounded-md aspect-[2/3]"
        data-ai-hint="movie poster"
      />
    </div>
  );
}
