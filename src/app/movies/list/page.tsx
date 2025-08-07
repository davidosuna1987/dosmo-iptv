"use client"

import { TopNavbar } from '@/components/common/navbar/top-navbar';
import { Main } from '@/components/common/main';
import { useState } from 'react';
import { NotFound } from '@/components/common/not-found';
import { BottomNavBar } from '@/components/common/navbar/bottom-navbar';
import { XTREAM_MEDIA_TYPES, xtreamMediaTypeToString, XtreamPreview } from '@/domain/xtream';
import { ChunkList } from '@/components/common/list/chunk-list';
import { useLocalXtreamData } from '@/hooks/use-local-xtream-data';
import { mapXtreamVodStreamToXtreamPreview } from '@/domain/movies';
import { LoadingContent } from '@/components/common/loading-content';

export default function MoviesListPage() {
  const { movies, isLoading } = useLocalXtreamData();
  const [searchInputValue, setSearchInputValue] = useState('')

  const items = movies
    .map(mapXtreamVodStreamToXtreamPreview)
    .filter(item => item.name.toLowerCase().includes(searchInputValue.toLowerCase()));

  const topNavbarTitle = xtreamMediaTypeToString(XTREAM_MEDIA_TYPES.movies).toUpperCase();

  return (
    <Main>
      { isLoading ? (
          <LoadingContent /> 
        ) : (
          <>
            <TopNavbar onInputChanged={setSearchInputValue} title={topNavbarTitle} />
            { items.length ? <ChunkList items={items} /> : <NotFound /> }
            <BottomNavBar />
          </>
        )
      }
    </Main>
  );
}
