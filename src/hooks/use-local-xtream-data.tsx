// src/hooks/use-local-xtream-data.ts
import { useEffect, useState } from "react";
import { openDB } from "idb";
import { useXtreamCredentials } from "@/hooks/use-xtream-credentials";
import { useXtreamClient } from "@/services/xtream";
import { ProfileInfo, XtreamPreview, XtreamCategoryWithPreview, XtreamSeriesInfo, XtreamVodCategory, XtreamVodStream, XtreamMediaType, XTREAM_MEDIA_TYPES, XtreamLiveStream, XtreamLiveCategory, XtreamSeriesCategory, ProfileDetails, XtreamPreviewDetailMovie, XtreamVodInfoResponse, XtreamPreviewDetail } from "@/domain/xtream";
import { sortByRating } from "@/domain/rating";
import { mapXtreamVodinfoResponseToXtreamPreviewDetail, mapXtreamVodStreamToXtreamPreview } from "@/domain/movies";
import { mapXtreamSeriesInfoToXtreamPreview } from "@/domain/series";
import { mapXtreamLiveStreamToXtreamPreview } from "@/domain/live";
import { EMPTY_PROFILE_DETAILS, mapProfileInfoToProfileDetails } from "@/domain/profile";

const DB_NAME = "dosmo-iptv";
const VERSION = 4;

async function getDB() {
    return openDB(DB_NAME, VERSION, {
      upgrade(db) {
        [
          "movies_categories",
          "movies",
          "movie_details",
          "series_categories",
          "series",
          "serie_details",
          "live_categories",
          "live",
          "profile",
        ].forEach((store) => {
          if (!db.objectStoreNames.contains(store)) {
            db.createObjectStore(store);
          }
        });
      },
    });
  }

export function useLocalXtreamData(mediaType?: XtreamMediaType, id?: string) {
  const { credentials } = useXtreamCredentials();
  const { getClient } = useXtreamClient();

  const detailId = id?.length ? id : undefined;

  const [profileInfo, setProfileInfo] = useState<ProfileInfo | undefined>(undefined);
  const [moviesCategories, setMoviesCategories] = useState<XtreamCategoryWithPreview[]>([]);
  const [movies, setMovies] = useState<XtreamVodStream[]>([]);
  const [movieDetails, setMovieDetails] = useState<XtreamPreviewDetail>();
  const [moviesHero, setMoviesHero] = useState<XtreamPreview | undefined>(undefined);
  const [seriesCategories, setSeriesCategories] = useState<XtreamCategoryWithPreview[]>([]);
  const [series, setSeries] = useState<XtreamSeriesInfo[]>([]);
  const [serieDetails, setSerieDetails] = useState<XtreamPreviewDetail>();
  const [seriesHero, setSeriesHero] = useState<XtreamPreview | undefined>(undefined);
  const [liveCategories, setLiveCategories] = useState<XtreamCategoryWithPreview[]>([]);
  const [live, setLive] = useState<XtreamLiveStream[]>([]);
  // const [liveDetails, setLiveDetails] = useState<XtreamPreviewDetailLive>()
  const [profileDetails, setProfileDetails] = useState<ProfileDetails>(EMPTY_PROFILE_DETAILS)
  const [isLoading, setIsLoading] = useState(true);

  const loadMovies = !mediaType || mediaType === XTREAM_MEDIA_TYPES.movies;
  const loadSeries = !mediaType || mediaType === XTREAM_MEDIA_TYPES.series;
  const loadLive = !mediaType || mediaType === XTREAM_MEDIA_TYPES.live;
  const loadMovieDetails = id && mediaType === XTREAM_MEDIA_TYPES.movies;
  const loadSerieDetails = id && mediaType === XTREAM_MEDIA_TYPES.series;
  const loadLiveDetails = id && mediaType === XTREAM_MEDIA_TYPES.live;

  useEffect(() => {
    const pickRandomXtreamPreview = (previews: XtreamPreview[]): XtreamPreview =>
      {
        let randomPreview: XtreamPreview;
        do (randomPreview = previews[Math.floor(Math.random() * previews.length)])
        while (!randomPreview || (randomPreview && !randomPreview.cover));
        return randomPreview;
      }

    async function fetchData() {
      if (!credentials) return;
      setIsLoading(true);

      try {
        const db = await getDB();
        const client = await getClient(credentials);

        let storedProfileInfo = await db.get("profile", "all");
        let storedMoviesCategories = await db.get("movies_categories", "all");
        let storedMovies = await db.get("movies", "all");
        let storedSeriesCategories = await db.get("series_categories", "all");
        let storedSeries = await db.get("series", "all");
        let storedLiveCategories = await db.get("live_categories", "all");
        let storedLive = await db.get("live", "all");

        let storedMovieDetails = id ? await db.get("movie_details", id) : null;
        let storedSerieDetails = id ? await db.get("serie_details", id) : null;

        setProfileDetails(
          mapProfileInfoToProfileDetails(
            credentials.listName,
            storedMovies?.length ?? 0,
            storedSeries?.length ?? 0,
            storedLive?.length ?? 0,
            storedProfileInfo
          )
        )

        if (!storedProfileInfo && client) {
          storedProfileInfo = await client.getProfileInfo(); // as ProfileInfo
          await db.put("profile", storedProfileInfo, "all");
          setProfileInfo(storedProfileInfo);
          setProfileDetails(
            mapProfileInfoToProfileDetails(
              credentials.listName,
              storedMovies?.length ?? 0,
              storedSeries?.length ?? 0,
              storedLive?.length ?? 0,
              storedProfileInfo
            )
          )
        }

        if(loadMovies){
          if ((!storedMoviesCategories || !storedMovies) && client) {
            if (!storedMoviesCategories) {
              storedMoviesCategories = await client.getVodCategories();
            }
            if (!storedMovies) {
              storedMovies = await client.getVodStreams();
              setProfileDetails((prev) => (prev ? {
                ...prev,
                moviesCount: storedMovies.length,
              } : prev))
            }

            const categoriesWithPreview = storedMoviesCategories.map((cat: XtreamVodCategory) => ({
              ...cat,
              mediaType: XTREAM_MEDIA_TYPES.movies,
              preview: storedMovies
                .filter((m: XtreamVodStream) => m.category_id === cat.category_id)
                .slice(0, 10)
                .map(mapXtreamVodStreamToXtreamPreview),
            }));

            await db.put("movies_categories", categoriesWithPreview, "all");
            await db.put("movies", storedMovies, "all");

            storedMoviesCategories = categoriesWithPreview;
          }

          // Top 100 películas por rating
          let bestRated: XtreamPreview[] = [];
          if (storedMovies && storedMovies.length > 0) {
            bestRated = [...storedMovies]
              .sort(sortByRating)
              .slice(0, 100)
              .map(mapXtreamVodStreamToXtreamPreview);
          }

          // Elegir una aleatoria del top 100
          let randomHero = bestRated.length > 0
              ? pickRandomXtreamPreview(bestRated)
              : undefined;

          setMoviesCategories(storedMoviesCategories || []);
          setMovies(storedMovies || []);
          setMoviesHero(randomHero);
        }

        if(loadSeries){
          if ((!storedSeriesCategories || !storedSeries) && client) {
            if (!storedSeriesCategories) {
              storedSeriesCategories = await client.getSeriesCategories();
            }
            if (!storedSeries) {
              storedSeries = await client.getSeries();
              setProfileDetails((prev) => (prev ? {
                ...prev,
                seriesCount: storedSeries.length,
              } : prev))
            }

            const categoriesWithPreview = storedSeriesCategories.map((cat: XtreamSeriesCategory) => ({
              ...cat,
              mediaType: XTREAM_MEDIA_TYPES.series,
              preview: storedSeries
                .filter((m: XtreamSeriesInfo) => m.category_id === cat.category_id)
                .slice(0, 10)
                .map(mapXtreamSeriesInfoToXtreamPreview),
            }));

            await db.put("series_categories", categoriesWithPreview, "all");
            await db.put("series", storedSeries, "all");

            storedSeriesCategories = categoriesWithPreview;
          }

          // Top 100 películas por rating
          let bestRated: XtreamPreview[] = [];
          if (storedSeries && storedSeries.length > 0) {
            bestRated = [...storedSeries]
              .sort(sortByRating)
              .slice(0, 100)
              .map(mapXtreamSeriesInfoToXtreamPreview);
          }

          // Elegir una aleatoria del top 100
          let randomHero = bestRated.length > 0
              ? pickRandomXtreamPreview(bestRated)
              : undefined;

          setSeriesCategories(storedSeriesCategories || []);
          setSeries(storedSeries || []);
          setSeriesHero(randomHero);
        }

        if(loadLive){
          if ((!storedLiveCategories || !storedLive) && client) {
            if (!storedLiveCategories) {
              storedLiveCategories = await client.getLiveCategories();
            }
            if (!storedLive) {
              storedLive = await client.getLiveStreams();
              setProfileDetails((prev) => (prev ? {
                ...prev,
                liveCount: storedLive.length,
              } : prev))
            }

            const categoriesWithPreview = storedLiveCategories.map((cat: XtreamLiveCategory) => ({
              ...cat,
              mediaType: XTREAM_MEDIA_TYPES.live,
              preview: storedLive
                .filter((m: XtreamLiveStream) => m.category_id === cat.category_id)
                .slice(0, 10)
                .map(mapXtreamLiveStreamToXtreamPreview),
            }));

            await db.put("live_categories", categoriesWithPreview, "all");
            await db.put("live", storedLive, "all");

            storedLiveCategories = categoriesWithPreview;
          }

          // Top 100 películas por rating
          let bestRated: XtreamPreview[] = [];
          if (storedLive && storedLive.length > 0) {
            bestRated = [...storedLive]
              .sort(sortByRating)
              .slice(0, 100)
              .map(mapXtreamLiveStreamToXtreamPreview);
          }

          setLiveCategories(storedLiveCategories || []);
          setLive(storedLive || []);
        }

        if(loadMovieDetails){
          console.log(1)
          if (!storedMovieDetails && detailId && client) {
            console.log(2)
            const apiMovieDetails = await client.getVodInfo(detailId);

            if(apiMovieDetails) storedMovieDetails = 
              mapXtreamVodinfoResponseToXtreamPreviewDetail(apiMovieDetails);

            await db.put("movie_details", storedMovieDetails, detailId);
            setMovieDetails(storedMovieDetails);
          } else {
            setMovieDetails(storedMovieDetails);
          }
        }
      } catch (err) {
        console.error("Error loading data:", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [credentials]);

  return { 
    profileInfo, 
    moviesCategories, 
    movies, 
    movieDetails,
    moviesHero, 
    seriesCategories, 
    series, 
    seriesHero, 
    serieDetails,
    liveCategories,
    live,
    profileDetails,
    isLoading,
  };
}
