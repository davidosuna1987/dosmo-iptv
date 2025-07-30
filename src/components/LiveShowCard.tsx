import Image from 'next/image';
import type { LiveShowItem } from '@/lib/data';

interface LiveShowCardProps {
  item: LiveShowItem;
}

export function LiveShowCard({ item }: LiveShowCardProps) {
  const [width, height] = item.posterPath.split('x').map(Number);
  return (
    <div className="flex flex-col gap-2">
      <div className="aspect-video bg-card rounded-lg flex items-center justify-center">
        <Image
          src={`https://placehold.co/${item.posterPath}.png`}
          alt={item.title}
          width={width}
          height={height}
          className="object-contain w-3/4 h-3/4"
          data-ai-hint="channel logo"
        />
      </div>
      <p className="text-center text-xs text-muted-foreground font-semibold">{item.title}</p>
    </div>
  );
}
