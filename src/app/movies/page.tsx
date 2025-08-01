"use client";

import { useEffect, useState } from 'react';
import { TopNavbar } from '@/components/common/navbar/top-navbar';
import { Hero } from '@/components/common/hero';
import { CarouselWrapper } from '@/components/common/carousel/carousel-wrapper';
import { heroItem, homeSections } from '@/lib/data';
import { Main } from '@/components/common/main';
import { CarouselSection } from '@/components/common/carousel/carousel-section';
import { useXtreamCredentials } from '@/hooks/use-xtream-credentials';
import { useXtreamClient } from '@/services/xtream';
import { XtreamVodCategory, XtreamVodStream } from '@/types';

export default function MoviesPage() {
  const { credentials } = useXtreamCredentials();
  const { getClient } = useXtreamClient();
  const [moviesCategories, setMoviesCategories] = useState<(XtreamVodCategory & { items: XtreamVodStream[] })[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchMovies() {
      if (credentials) {
        const client = await getClient(credentials);
        if (client) {
          const categories = await client.getVodCategoriesWithContent();
          setMoviesCategories(categories);

          console.log({categories})
        }
      }
      setIsLoading(false);
    }

    fetchMovies();
  }, [credentials, getClient]);

  return (
    <Main>
      <TopNavbar searchLink="/movies/list" />
      <Hero item={heroItem} />
      <pre>{JSON.stringify(moviesCategories, null, 2)}</pre>
      <CarouselSection>
        {homeSections.map(section => (
          <CarouselWrapper key={section.id} section={section} />
        ))}
      </CarouselSection>
    </Main>
  );
}
