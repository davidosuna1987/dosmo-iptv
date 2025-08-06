"use client"

import { TopNavbar } from '@/components/common/navbar/top-navbar';
import { Main } from '@/components/common/main';
import { useState } from 'react';
import { NotFound } from '@/components/common/not-found';
import { BottomNavBar } from '@/components/common/navbar/bottom-navbar';
import { XtreamPreview } from '@/domain/xtream';
import { ChunkList } from '@/components/common/list/chunk-list';
import { useLocalXtreamData } from '@/hooks/use-local-xtream-data';
import { mapXtreamVodStreamToXtreamPreview } from '@/domain/movies';

export default function MoviesListPage() {
  const { movies, isLoading } = useLocalXtreamData();
  const [searchInputValue, setSearchInputValue] = useState('')

  const items = movies
    .map(mapXtreamVodStreamToXtreamPreview)
    .filter(item => item.name.toLowerCase().includes(searchInputValue.toLowerCase()));

  return (
    <Main>
      <TopNavbar onInputChanged={setSearchInputValue}/>
      { items.length ? <ChunkList items={items} /> : <NotFound /> }
      <BottomNavBar />
    </Main>
  );
}
