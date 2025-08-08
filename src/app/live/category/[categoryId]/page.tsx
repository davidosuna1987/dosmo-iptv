"use client"

import { TopNavbar } from '@/components/common/navbar/top-navbar';
import { Main } from '@/components/common/main';
import { useState } from 'react';
import { NotFound } from '@/components/common/not-found';
import { BottomNavBar } from '@/components/common/navbar/bottom-navbar';
import { ChunkList } from '@/components/common/list/chunk-list';
import { useLocalXtreamData } from '@/hooks/use-local-xtream-data';
import { LoadingContent } from '@/components/common/loading-content';
import { useParams } from 'next/navigation';
import { mapXtreamLiveStreamToXtreamPreview } from '@/domain/live';

export default function LiveCategoryPage() {
  const params = useParams();
  const { live, liveCategories, isLoading } = useLocalXtreamData();
  const [searchInputValue, setSearchInputValue] = useState('')

  const categoryId = Number(params?.categoryId) ?? 0;
  const liveCategory = liveCategories.find(category => Number(category.category_id) === categoryId)
  const topNavbarTitle = liveCategory?.category_name;
  
  const items = live
    .map(mapXtreamLiveStreamToXtreamPreview)
    .filter(item => item.categoryIds.includes(categoryId))
    .filter(item => item.title.toLowerCase().includes(searchInputValue.toLowerCase()));


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
