import Image from 'next/image';
import type { CarouselItem } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { BIcon } from './navbar/bottom-navbar';

const Play = ({ className }: { className?: string }) => (
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
    <div className="flex justify-center bg-background relative -mt-16 -mx-4 md:-mx-8">
      <div className='absolute size-full after:content-[""] after:absolute after:inset-0 after:pointer-events-none after:bg-gradient-to-t after:from-black after:to-black/90'> {/*after:bg-background after:opacity-[0.925]*/}
        <Image
          src="https://via.assets.so/movie.png?id=1&q=95&w=280&h=410&fit=contain"
          alt={item.title}
          width={width}
          height={height}
          className="object-cover size-full"
          priority
          data-ai-hint="movie poster"
        />
      </div>
      <div className="relative w-full max-w-[280px] md:max-w-[400px] lg:max-w-[500px] h-full rounded-xl overflow-hidden pt-16">
        <Image
          src="https://via.assets.so/movie.png?id=1&q=95&w=280&h=410&fit=contain"
          alt={item.title}
          width={width}
          height={height}
          className="object-cover size-full"
          priority
          data-ai-hint="movie poster"
        />
        <div className="absolute inset-0 flex flex-col justify-end px-3 pb-3 bg-gradient-to-t from-black to-transparent rounded-xl">
          <div className="space-y-3">
              <p className="text-sm font-semibold tracking-wide uppercase text-primary flex items-center">
                <BIcon />
                PELÍCULAS
              </p>
              <div className="grid grid-cols-2 gap-3">
                  <Button size="lg" className="w-full font-bold border-0">
                      <Play />
                      Reproducir
                  </Button>
                  <Button size="lg" variant="secondary" className="w-full font-bold border-0">
                      <Plus />
                      Favoritos
                  </Button>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}
