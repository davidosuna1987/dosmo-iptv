
"use client";

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Plus, Calendar, Star, Grid, Film, Clock } from 'lucide-react';
import { safeUrl } from '@/domain/url';
import { PlayIcon } from '@/components/ui/play-icon';
import { Progress } from '@/components/ui/progress';
import { XtreamPreviewDetail, } from '@/domain/xtream';

type MovieDetailProps = {
  details: XtreamPreviewDetail
}
export function MovieDetail({ details }: MovieDetailProps) {
  const secureCover = safeUrl(details.cover);
  const secureCoverBig = safeUrl(details.coverBig);
  
  return (
    <div className="relative -mx-4 md:-mx-6 flex-1">
      {/* Background Image */}
      <div className='fixed inset-0 size-full after:content-[""] after:absolute after:inset-0 after:pointer-events-none after:bg-gradient-to-t after:from-black after:to-black/75'>
        <Image
          src={secureCoverBig}
          alt={details.title}
          layout="fill"
          className="object-cover size-full"
          priority
          unoptimized
          data-ai-hint="movie background"
        />
      </div>

      {/* Foreground Content */}
      <div className="relative py-16 px-4 md:px-6 text-white flex flex-col items-center text-center">
        <div className="w-full max-w-[240px] md:max-w-[280px] rounded-lg overflow-hidden shadow-lg">
          <Image
            src={secureCover}
            alt={details.title}
            width={280}
            height={420}
            className="object-cover w-full"
            priority
            unoptimized
            data-ai-hint="movie poster"
          />
        </div>

        <div className="mt-6 space-y-4 w-full max-w-lg mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold">{details.title}</h1>
          
          <div className="flex justify-center items-center flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Star className="w-4 h-4 text-primary" />
              <span>{details.rating5Based ?? 'N/A'}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-primary" />
              <span>{details.duration}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Film className="w-4 h-4 text-primary" />
              <span>{details.director || 'N/A'}</span>
            </div>
          </div>

          <div className="flex justify-center items-center flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-primary" />
                <span>{details.releaseDate?.substring(0,4)}</span>
            </div>
            <div className="flex items-center gap-1.5">
                <Grid className="w-4 h-4 text-primary" />
                <span>{details.genre || 'N/A'}</span>
            </div>
          </div>
          
          <div className="relative space-y-3 pt-3">
            <div className="absolute -top-2 w-full">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>0m 0s</span>
                  <span>{details.duration}</span>
              </div>
              <Progress value={0} className="h-1.5" />
            </div>
            <Button size="lg" className="w-full font-bold mt-3">
              <PlayIcon />
              Reanudar
            </Button>
            <Button size="lg" variant="secondary" className="w-full font-bold">
              <Plus />
              Mi Lista
            </Button>
          </div>

          <div className="text-left text-sm space-y-4 pt-4">
            <p className="text-foreground/90">{details.plot}</p>
            {details.cast && (
              <div className="flex items-start gap-2">
                <Grid className="w-4 h-4 mt-0.5 shrink-0" />
                <p><span className="font-semibold mr-1.5">Reparto:</span>{details.cast}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
