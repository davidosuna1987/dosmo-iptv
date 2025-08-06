"use client"

import { TopNavbar } from '@/components/common/navbar/top-navbar';
import { Main } from '@/components/common/main';
import { useState } from 'react';
import { NotFound } from '@/components/common/not-found';
import { BottomNavBar } from '@/components/common/navbar/bottom-navbar';
import { useLocalXtreamData } from '@/hooks/use-local-xtream-data';
import { mapXtreamSeriesInfoToXtreamPreview } from '@/domain/series';
import { ChunkList } from '@/components/common/list/chunk-list';
import { LoadingContent } from '@/components/common/loading-content';

export default function MoviesListPage() {
  const { series, isLoading } = useLocalXtreamData();
  const [searchInputValue, setSearchInputValue] = useState('')

  const items = series
    .map(mapXtreamSeriesInfoToXtreamPreview)
    .filter(item => item.name.toLowerCase().includes(searchInputValue.toLowerCase()));

  return (
    <Main>
      { isLoading ? (
          <LoadingContent /> 
        ) : (
          <>
            <TopNavbar onInputChanged={setSearchInputValue}/>
            { items.length ? <ChunkList items={items} /> : <NotFound /> }
            <BottomNavBar />
          </>
        )
      }
    </Main>
  );
}
