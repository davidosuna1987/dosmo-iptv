import Image from 'next/image';
import type { CarouselItem } from '@/lib/data';

interface CarouselCardProps {
  item: CarouselItem;
}

export function CarouselCard({ item }: CarouselCardProps) {
  const [width, height] = item.posterPath.split('x').map(Number);

  return (
    <div className="w-[31%] md:w-[23.5%] lg:w-[19%] flex-shrink-0 snap-start overflow-hidden group">
      <Image
        src="https://via.assets.so/movie.png?id=1&q=95&w=280&h=410&fit=contain"
        alt={item.title}
        width={width}
        height={height}
        className="object-cover w-full rounded-md aspect-[2/3] group-hover:scale-110 transition-transform duration-200"
        data-ai-hint="movie poster"
      />
    </div>
  );
}
