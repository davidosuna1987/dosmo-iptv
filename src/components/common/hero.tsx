
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { DosmoIptvLogo } from './dosmo-iptv-logo';
import { XtreamPreview, XtreamMediaType, xtreamMediaTypeToString } from '@/domain/xtream';
import { safeUrl } from '@/domain/url';

const Play = ({ className }: { className?: string }) => (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 5V19L19 12L8 5Z" />
    </svg>
)

interface HeroProps {
  type: XtreamMediaType
  item: XtreamPreview;
}

export function Hero({ type, item }: HeroProps) {
  const secureUrl = safeUrl(item.cover)
  
  return (
    <>
    <pre>{JSON.stringify(item, null, 2)}</pre>
    <div className="flex justify-center bg-background relative -mx-4 md:-mx-8">
      <div className='absolute size-full after:content-[""] after:absolute after:inset-0 after:pointer-events-none after:bg-gradient-to-t after:from-black after:to-black/90'> {/*after:bg-background after:opacity-[0.925]*/}
        <Image
          src={secureUrl}
          alt={item.name}
          width={200}
          height={300}
          className="object-cover size-full"
          priority
          data-ai-hint="movie poster"
          unoptimized
          
        />
      </div>
      <div className="relative w-full max-w-[280px] md:max-w-[400px] lg:max-w-[500px] h-full rounded-xl overflow-hidden pt-16">
        <Image
          src={secureUrl}
          alt={item.name}
          width={200}
          height={300}
          className="object-cover size-full"
          priority
          data-ai-hint="movie poster"
          unoptimized
        />
        <div className="absolute inset-0 flex flex-col justify-end px-3 pb-3 bg-gradient-to-t from-black to-transparent rounded-xl">
          <div className="space-y-3">
              <p className="text-sm font-semibold tracking-wide uppercase text-primary flex items-center gap-3">
                <DosmoIptvLogo className='w-8' />
                {xtreamMediaTypeToString(type)}
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
    </>
  );
}
