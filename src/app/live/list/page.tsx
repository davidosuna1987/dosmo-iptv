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

export default function MoviesListPage() {
  const { live, isLoading } = useLocalXtreamData();
  const [searchInputValue, setSearchInputValue] = useState('')

  const items = live
    .map(mapXtreamLiveStreamToXtreamPreview)
    .filter(item => item.name.toLowerCase().includes(searchInputValue.toLowerCase()));

  return (
    <Main>
      { isLoading ? (
          <LoadingContent /> 
        ) : (
          <>
            <TopNavbar onInputChanged={setSearchInputValue}/>
            { items.length ? <LiveStreamChunkList items={items} /> : <NotFound /> }
            <BottomNavBar />
          </>
        )
      }
    </Main>
  );
}
