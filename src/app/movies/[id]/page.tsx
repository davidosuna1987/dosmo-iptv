"use client"

import { LoadingContent } from '@/components/common/loading-content';
import { Main } from '@/components/common/main';
import { TopDetailNavbar } from '@/components/common/navbar/top-detail-navbar';
import { NotFound } from '@/components/common/not-found';
import { MovieDetail } from '@/components/views/movies/detail';
import { XTREAM_MEDIA_TYPES } from '@/domain/xtream';
import { useLocalXtreamData } from '@/hooks/use-local-xtream-data';
import { useParams } from 'next/navigation';

export default function MovieDetailPage() {
  const params = useParams()
  const movieId = params.id as string;

  const { movieDetails, isLoading } = 
    useLocalXtreamData(XTREAM_MEDIA_TYPES.movies, movieId);
    
  return (
    <Main>
      {isLoading ? (
        <LoadingContent />
      ) : movieDetails ? (
        <>
          <TopDetailNavbar />
          <MovieDetail details={movieDetails} />
        </>
      ) : (
        <NotFound />
      )}
    </Main>
  );
}
