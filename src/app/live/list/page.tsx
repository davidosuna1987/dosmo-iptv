"use client"

import { TopNavbar } from '@/components/common/navbar/top-navbar';
import { Main } from '@/components/common/main';
import { useState } from 'react';
import { NotFound } from '@/components/common/not-found';
import { BottomNavBar } from '@/components/common/navbar/bottom-navbar';
import { useLocalXtreamData } from '@/hooks/use-local-xtream-data';
import { mapXtreamLiveStreamToXtreamPreview } from '@/domain/live';
import { LiveStreamChunkList } from '@/components/live-stream/live-stream-chunk-list';
import { LoadingContent } from '@/components/common/loading-content';
import { XTREAM_MEDIA_TYPES, xtreamMediaTypeToString } from '@/domain/xtream';

export default function MoviesListPage() {
  const { live, isLoading } = useLocalXtreamData();
  const [searchInputValue, setSearchInputValue] = useState('')

  const items = live
    .map(mapXtreamLiveStreamToXtreamPreview)
    .filter(item => item.title.toLowerCase().includes(searchInputValue.toLowerCase()));

  const topNavbarTitle = xtreamMediaTypeToString(XTREAM_MEDIA_TYPES.live).toUpperCase();

  return (
    <Main>
      { isLoading ? (
          <LoadingContent /> 
        ) : (
          <>
            <TopNavbar onInputChanged={setSearchInputValue} title={topNavbarTitle} />
            { items.length ? <LiveStreamChunkList items={items} /> : <NotFound /> }
            <BottomNavBar />
          </>
        )
      }
    </Main>
  );
}
