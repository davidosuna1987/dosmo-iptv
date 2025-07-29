import Image from 'next/image';
import type { CarouselItem } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

const PlayIcon = ({ className }: { className?: string }) => (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 5V19L19 12L8 5Z" />
    </svg>
)

interface HeroProps {
  item: CarouselItem;
}

export function Hero({ item }: HeroProps) {
  const [width, height] = item.posterPath.split('x').map(Number);

  return (
    <div className="flex justify-center mt-4">
      <div className="w-full max-w-[280px]">
        <Image
          src={`https://placehold.co/${item.posterPath}.png`}
          alt={item.title}
          width={width}
          height={height}
          className="object-cover w-full rounded-t-xl"
          priority
          data-ai-hint="movie poster"
        />
        <div className="mt-3 space-y-3">
            <p className="text-sm font-semibold tracking-wide uppercase text-primary">b PELÍCULAS</p>
            <div className="grid grid-cols-2 gap-3">
                <Button size="lg" className="w-full font-bold bg-white text-black hover:bg-white/90">
                    <PlayIcon className="w-6 h-6" />
                    Reproducir
                </Button>
                <Button size="lg" variant="outline" className="w-full font-bold bg-black/30 border-neutral-500 text-white hover:bg-neutral-800 hover:border-neutral-400">
                    <Plus className="w-6 h-6" />
                    Mi Lista
                </Button>
            </div>
        </div>
      </div>
    </div>
  );
}
