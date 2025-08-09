
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { DosmoIptvLogo } from './dosmo-iptv-logo';
import { XtreamPreview, XtreamMediaType, xtreamMediaTypeToString } from '@/domain/xtream';
import { safeUrl } from '@/domain/url';
import { PlayIcon } from '../ui/play-icon';
import Link from 'next/link';

interface HeroProps {
  item: XtreamPreview;
}

export function Hero({ item }: HeroProps) {
  const secureUrl = safeUrl(item.cover)
  const detailUrl = `/${item.mediaType}/${item.id}`;
  
  return (
    <div className="flex justify-center bg-background relative -mx-4 md:-mx-8">
      <div className='absolute size-full after:content-[""] after:absolute after:inset-0 after:pointer-events-none after:bg-gradient-to-t after:from-black after:to-black/75'> {/*after:bg-background after:opacity-[0.925]*/}
        <Image
          src={secureUrl}
          alt={item.title}
          width={200}
          height={300}
          className="object-cover size-full"
          priority
          data-ai-hint="movie poster"
          unoptimized
          
        />
      </div>
      <div className="relative w-full max-w-[280px] md:max-w-[350px] lg:max-w-[400px] h-full rounded-xl overflow-hidden pt-16">
        <Image
          src={secureUrl}
          alt={item.title}
          width={200}
          height={300}
          className="object-cover size-full rounded-xl"
          priority
          data-ai-hint="movie poster"
          unoptimized
        />
        <div className="absolute inset-0 flex flex-col justify-end px-3 pb-3 bg-gradient-to-t from-black to-transparent rounded-xl">
          <div className="space-y-3">
              <p className="text-sm font-semibold tracking-wide uppercase text-primary flex items-center gap-3">
                <DosmoIptvLogo className='w-8' />
                {xtreamMediaTypeToString(item.mediaType)}
              </p>
              <div className="grid grid-cols-2 gap-3">
                  <Link href={detailUrl}>
                      <Button size="lg" className="w-full font-bold border-0">
                          <PlayIcon />
                          Reproducir
                      </Button>
                  </Link>
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
