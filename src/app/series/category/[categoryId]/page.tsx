"use client"

import { TopNavbar } from '@/components/common/navbar/top-navbar';
import { Main } from '@/components/common/main';
import { useState } from 'react';
import { NotFound } from '@/components/common/not-found';
import { BottomNavBar } from '@/components/common/navbar/bottom-navbar';
import { ChunkList } from '@/components/common/list/chunk-list';
import { useLocalXtreamData } from '@/hooks/use-local-xtream-data';
import { mapXtreamSeriesInfoToXtreamPreview } from '@/domain/series';
import { LoadingContent } from '@/components/common/loading-content';
import { useParams } from 'next/navigation';

export default function SeriesCategoryPage() {
  const params = useParams();
  const { series, seriesCategories, isLoading } = useLocalXtreamData();
  const [searchInputValue, setSearchInputValue] = useState('')

  const categoryId = Number(params?.categoryId) ?? 0;
  const seriesCategory = seriesCategories.find(category => Number(category.category_id) === categoryId)
  const topNavbarTitle = seriesCategory?.category_name;
  
  const items = series
    .map(mapXtreamSeriesInfoToXtreamPreview)
    .filter(item => item.category_ids.includes(categoryId))
    .filter(item => item.name.toLowerCase().includes(searchInputValue.toLowerCase()));


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
