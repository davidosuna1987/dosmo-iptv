import { XTREAM_MEDIA_TYPES,
    XtreamEpisode,
    XtreamPreview,
    XtreamPreviewDetail,
    XtreamPreviewDetailSerieEpisode,
    XtreamPreviewDetailSerieEpisodes,
    XtreamPreviewDetailSerieSeason,
    XtreamSeason,
    XtreamSeriesDetailResponse,
    XtreamSeriesInfo
} from "@/domain/xtream";
  
export const mapXtreamSeriesInfoToXtreamPreview = (
    seriesInfo: XtreamSeriesInfo
): XtreamPreview => ({
    mediaType: XTREAM_MEDIA_TYPES.series,
    id: seriesInfo.series_id,
    num: seriesInfo.num,
    title: seriesInfo.name,
    cover: seriesInfo.cover,
    rating: seriesInfo.rating,
    rating5Based: seriesInfo.rating_5based,
    categoryIds: seriesInfo.category_ids,
});

export const mapXtreamSeriesDetailResponseToXtreamPreviewDetail = (
    response: XtreamSeriesDetailResponse
): XtreamPreviewDetail => {
    const { info, episodes, seasons } = response;
  
    const coverBig = info.backdrop_path?.[0];
    const cover = info.cover ?? coverBig;
    const rating = info.rating;
    const rating5Based = info.rating_5based;
    const { duration, durationSecs } =
      mapXtreamSeriesDetailResponseEpisodesToXtreamPreviewDetailDuration(episodes);
  
    return {
      mediaType: XTREAM_MEDIA_TYPES.series,
      id: info.series_id,
      title: info.name,
      cover: cover ?? "",
      coverBig: coverBig ?? cover ?? "",
      trailer: info.youtube_trailer,
      categoryId: Number(info.category_id),
      categoryIds: info.category_ids,
      rating,
      rating5Based,
      releaseDate: info.releaseDate,
      duration,
      durationSecs,
      runTime: info.episode_run_time,
      director: info.director,
      cast: info.cast,
      plot: info.plot,
      genre: info.genre,
      status: info.last_modified,
      episodes: mapXtreamEpisodesToXtreamPreviewDetailEpisodes(episodes),
      seasons: mapXtreamSeasonsToXtreamPreviewDetailSeasons(seasons),
    };
};

export const mapXtreamSeriesDetailResponseEpisodesToXtreamPreviewDetailDuration = (
    episodes: XtreamSeriesDetailResponse['episodes']
  ): { duration: string; durationSecs: number } => {
    const allEpisodes = Object.values(episodes).flat();

    const totalSeconds = allEpisodes.reduce((acc, ep) => {
        const secs = ep.info?.duration_secs ?? 0;
        return acc + secs;
    }, 0);

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);

    const durationStr = [
        hours > 0 ? `${hours}h` : null,
        minutes > 0 ? `${minutes}m` : null,
    ]
        .filter(Boolean)
        .join(" ") || "0m";

    return {
        duration: durationStr,
        durationSecs: totalSeconds,
    };
};

export const mapXtreamEpisodesToXtreamPreviewDetailEpisodes = (
    episodes: Record<string, XtreamEpisode[]>
): XtreamPreviewDetailSerieEpisodes => {
    return Object.fromEntries(
      Object.entries(episodes).map(([seasonNumber, eps]) => [
        seasonNumber,
        eps.map((ep): XtreamPreviewDetailSerieEpisode => ({
          id: ep.id,
          episodeNum: ep.episode_num,
          title: ep.title,
          season: ep.season,
          info: {
            id: ep.info.tmdb_id,
            plot: ep.info.plot ?? "",
            duration: ep.info.duration ?? "0m",
            durationSecs: ep.info.duration_secs ?? 0,
            cover: ep.info.movie_image,
            rating: ep.info.rating,
            rating5Based: ep.info.rating,
          },
        })),
      ])
    );
};
  
export const mapXtreamSeasonsToXtreamPreviewDetailSeasons = (
    seasons: XtreamSeason[]
): XtreamPreviewDetailSerieSeason[] => {
    return seasons.map((season): XtreamPreviewDetailSerieSeason => ({
      airDate: season.air_date,
      episodeCount: season.episode_count,
      id: season.id,
      name: season.name,
      overview: season.overview,
      seasonNumber: season.season_number,
      cover: season.cover,
      coverBig: season.cover_big,
    }));
};
  