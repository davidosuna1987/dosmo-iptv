"use client";

import { TopNavbar } from '@/components/common/navbar/top-navbar';
import { BottomNavBar } from '@/components/common/navbar/bottom-navbar';
import { LiveStreamWrapper } from '@/components/live-stream/live-stream-wrapper';
import { Main } from '@/components/common/main';
import { CarouselSection } from '@/components/common/carousel/carousel-section';
import { useLocalXtreamData } from '@/hooks/use-local-xtream-data';
import { XTREAM_MEDIA_TYPES } from '@/domain/xtream';
import { LoadingContent } from '@/components/common/loading-content';

export default function LivePage() {
  const { liveCategories, isLoading } =
    useLocalXtreamData(XTREAM_MEDIA_TYPES.live);

  return (
    <Main>
      {isLoading ? (
        <LoadingContent />
      ) : ( 
        <>
          <TopNavbar searchLink="/live/list" />
          <CarouselSection>
              {liveCategories.map(category => (
                  <LiveStreamWrapper key={category.category_id} mediaType={XTREAM_MEDIA_TYPES.live} category={category} />
              ))}
          </CarouselSection>
          <BottomNavBar />
        </>
      )}
    </Main>
  );
}
