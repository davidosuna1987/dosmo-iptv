
"use client";

import { useContext } from 'react';
import { useParams } from 'next/navigation';
import { XtreamContext } from '@/context/xtream-context';
import { LoadingContent } from '@/components/common/loading-content';
import { Main } from '@/components/common/main';
import { TopDetailNavbar } from '@/components/common/navbar/top-detail-navbar';
import { MovieDetail } from '@/components/views/movies/detail';
import { NotFound } from '@/components/common/not-found';
import { mapXtreamVodStreamToXtreamPreview } from '@/domain/movies';

export default function MovieDetailPage() {
  const params = useParams();
  const { movies, isLoading, getVodInfo } = useContext(XtreamContext);
  const [movieDetails, setMovieDetails] = React.useState<any>(null); // U xtreamvodinforesponse
  const [loadingDetails, setLoadingDetails] = React.useState(true);
  
  const id = params?.id as string;

  React.useEffect(() => {
    if (id) {
      const foundMovie = movies.find(m => m.stream_id.toString() === id);
      if (foundMovie) {
        // We have basic info, fetch detailed info
        getVodInfo(id).then(details => {
          setMovieDetails(details);
          setLoadingDetails(false);
        });
      } else if(!isLoading) {
        // Movie not found in context, fetch details
        getVodInfo(id).then(details => {
          setMovieDetails(details);
          setLoadingDetails(false);
        });
      }
    }
  }, [id, movies, isLoading, getVodInfo]);

  const item = movieDetails ? {
    ...mapXtreamVodStreamToXtreamPreview(movieDetails.movie_data),
    ...movieDetails.info
  } : null;

  const isLoadingPage = isLoading || loadingDetails;

  return (
    <Main>
      {isLoadingPage ? (
        <LoadingContent />
      ) : item ? (
        <>
          <TopDetailNavbar />
          <MovieDetail item={item} />
        </>
      ) : (
        <>
          <TopDetailNavbar />
          <NotFound />
        </>
      )}
    </Main>
  );
}
