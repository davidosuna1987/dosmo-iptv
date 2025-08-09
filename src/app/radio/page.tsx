"use client";
import { useState, useMemo } from 'react';
import { TopNavbar } from '@/components/common/navbar/top-navbar';
import { Main } from '@/components/common/main';
import { BottomNavBar } from '@/components/common/navbar/bottom-navbar';
import { NotFound } from '@/components/common/not-found';
import { LoadingContent } from '@/components/common/loading-content';
import { useRadioStations } from '@/hooks/use-radio-stations';
import { RadioStationChunkList } from '@/components/radio/radio-station-chunk-list';

export default function RadioStationPage() {
  const [search, setSearch] = useState('');
  const { stations, isLoading, setQuery, query } = useRadioStations({ limit: 300 });

  // filtro client-side adicional por nombre
  const filtered = useMemo(() => {
    const s = search.trim().toLowerCase();
    if (!s) return stations;
    return stations.filter((st) => st.name.toLowerCase().includes(s));
  }, [stations, search]);

  return (
    <Main>
      {isLoading ? (
        <LoadingContent />
      ) : (
        <>
          <TopNavbar onInputChanged={setSearch} title="RADIO" />
          {filtered.length ? <RadioStationChunkList items={filtered} /> : <NotFound />}
          <BottomNavBar />
        </>
      )}
    </Main>
  );
}