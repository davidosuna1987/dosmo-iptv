
"use client";

import { Main } from '@/components/common/main';
import { TopDetailNavbar } from '@/components/common/navbar/top-detail-navbar';
import { MovieDetail } from '@/components/views/movies/detail';

export default function MovieDetailPage() {
  return (
    <Main>
      <TopDetailNavbar />
      <MovieDetail />
    </Main>
  );
}
