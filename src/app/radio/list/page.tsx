"use client"

import { useState } from 'react';
import { TopNavbar } from '@/components/common/navbar/top-navbar';
import { Main } from '@/components/common/main';
import { BottomNavBar } from '@/components/common/navbar/bottom-navbar';
import { NotFound } from '@/components/common/not-found';
import { LoadingContent } from '@/components/common/loading-content';
import { RadioStationChunkList } from '@/components/radio/radio-station-chunk-list';
import { useRadioStations } from '@/hooks/use-radio-stations';

export default function RadioPage() {
  const [searchInputValue, setSearchInputValue] = useState('');
  const { stations, isLoading } = useRadioStations({ limit: 300 });

  const filteredItems = stations.filter((item) =>
    item.name.toLowerCase().includes(searchInputValue.toLowerCase())
  );

  return (
    <Main>
      {isLoading ? (
        <LoadingContent />
      ) : (
        <>
          <TopNavbar onInputChanged={setSearchInputValue} title="RADIO" />
          {filteredItems.length ? (
            <RadioStationChunkList items={filteredItems} />
          ) : (
            <NotFound />
          )}
          <BottomNavBar />
        </>
      )}
    </Main>
  );
}
