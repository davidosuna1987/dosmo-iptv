"use client";

import { TopNavbar } from '@/components/common/navbar/top-navbar';
import { Hero } from '@/components/common/hero';
import { CarouselWrapper } from '@/components/common/carousel/carousel-wrapper';
import { Main } from '@/components/common/main';
import { CarouselSection } from '@/components/common/carousel/carousel-section';
import { LoadingContent } from '@/components/common/loading-content';
import { BottomNavBar } from '@/components/common/navbar/bottom-navbar';
import { XTREAM_MEDIA_TYPES } from '@/domain/xtream';
import { useLocalXtreamData } from '@/hooks/use-local-xtream-data';

export default function MoviesPage() {
  const { moviesCategories, moviesHero, isLoading } =
    useLocalXtreamData(XTREAM_MEDIA_TYPES.movies);

  return (
    <Main>
      {isLoading ? (
        <LoadingContent />
      ) : ( 
        <>
          <TopNavbar searchLink="/movies/list" />

          { moviesHero && <Hero item={moviesHero} /> }

          <CarouselSection>
            {moviesCategories.map(category => (
              <CarouselWrapper key={category.category_id} category={category} />
            ))}
          </CarouselSection>

          <BottomNavBar />
        </>
      )}
    </Main>
  );
}
