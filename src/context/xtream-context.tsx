
"use client";

import { createContext, useCallback, useEffect, useState } from "react";
import { openDB } from "idb";
import { useXtreamCredentials } from "@/hooks/use-xtream-credentials";
import { useXtreamClient, XtreamClient } from "@/services/xtream";
import { ProfileInfo, XtreamPreview, XtreamCategoryWithPreview, XtreamSeriesInfo, XtreamVodCategory, XtreamVodStream, XtreamMediaType, XTREAM_MEDIA_TYPES, XtreamLiveStream, XtreamLiveCategory, XtreamSeriesCategory, ProfileDetails, XtreamVodInfoResponse } from "@/domain/xtream";
import { sortByRating } from "@/domain/rating";
import { mapXtreamVodStreamToXtreamPreview } from "@/domain/movies";
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
          "series_categories",
          "series",
          "live_categories",
          "live",
          "profile",
          "vod_info"
        ].forEach((store) => {
          if (!db.objectStoreNames.contains(store)) {
            db.createObjectStore(store);
          }
        });
      },
    });
  }

interface IXtreamContext {
    profileInfo: ProfileInfo | undefined;
    moviesCategories: XtreamCategoryWithPreview[];
    movies: XtreamVodStream[];
    moviesHero: XtreamPreview | undefined;
    seriesCategories: XtreamCategoryWithPreview[];
    series: XtreamSeriesInfo[];
    seriesHero: XtreamPreview | undefined;
    liveCategories: XtreamCategoryWithPreview[];
    live: XtreamLiveStream[];
    profileDetails: ProfileDetails;
    isLoading: boolean;
    getVodInfo: (vodId: string) => Promise<XtreamVodInfoResponse | null>;
}

export const XtreamContext = createContext<IXtreamContext>({
    profileInfo: undefined,
    moviesCategories: [],
    movies: [],
    moviesHero: undefined,
    seriesCategories: [],
    series: [],
    seriesHero: undefined,
    liveCategories: [],
    live: [],
    profileDetails: EMPTY_PROFILE_DETAILS,
    isLoading: true,
    getVodInfo: async () => null,
});

export function XtreamProvider({ children }: { children: React.ReactNode }) {
    const { credentials } = useXtreamCredentials();
    const { getClient } = useXtreamClient();
  
    const [profileInfo, setProfileInfo] = useState<ProfileInfo | undefined>(undefined);
    const [moviesCategories, setMoviesCategories] = useState<XtreamCategoryWithPreview[]>([]);
    const [movies, setMovies] = useState<XtreamVodStream[]>([]);
    const [moviesHero, setMoviesHero] = useState<XtreamPreview | undefined>(undefined);
    const [seriesCategories, setSeriesCategories] = useState<XtreamCategoryWithPreview[]>([]);
    const [series, setSeries] = useState<XtreamSeriesInfo[]>([]);
    const [seriesHero, setSeriesHero] = useState<XtreamPreview | undefined>(undefined);
    const [liveCategories, setLiveCategories] = useState<XtreamCategoryWithPreview[]>([]);
    const [live, setLive] = useState<XtreamLiveStream[]>([]);
    const [profileDetails, setProfileDetails] = useState<ProfileDetails>(EMPTY_PROFILE_DETAILS)
    const [isLoading, setIsLoading] = useState(true);
    const [client, setClient] = useState<XtreamClient | null>(null);

    useEffect(() => {
      const initializeClient = async () => {
        if (credentials) {
          const xtreamClient = await getClient(credentials);
          setClient(xtreamClient);
        }
      };
      initializeClient();
    }, [credentials, getClient]);

    const getVodInfo = useCallback(async (vodId: string) => {
      if (!client) return null;
      
      const db = await getDB();
      let storedInfo = await db.get("vod_info", vodId);

      if (!storedInfo) {
        storedInfo = await client.getVodInfo(vodId);
        if (storedInfo) {
          await db.put("vod_info", storedInfo, vodId);
        }
      }
      return storedInfo;

    }, [client]);
  
    useEffect(() => {
      const pickRandomXtreamPreview = (previews: XtreamPreview[]): XtreamPreview =>
        {
          let randomPreview: XtreamPreview;
          do (randomPreview = previews[Math.floor(Math.random() * previews.length)])
          while (!randomPreview || (randomPreview && !randomPreview.cover));
          return randomPreview;
        }
  
      async function fetchData() {
        if (!credentials || !client) return;
        setIsLoading(true);
  
        try {
          const db = await getDB();
  
          let storedProfileInfo = await db.get("profile", "all");
          let storedMoviesCategories = await db.get("movies_categories", "all");
          let storedMovies = await db.get("movies", "all");
          let storedSeriesCategories = await db.get("series_categories", "all");
          let storedSeries = await db.get("series", "all");
          let storedLiveCategories = await db.get("live_categories", "all");
          let storedLive = await db.get("live", "all");
  
          setProfileDetails(
            mapProfileInfoToProfileDetails(
              credentials.listName,
              storedMovies?.length ?? 0,
              storedSeries?.length ?? 0,
              storedLive?.length ?? 0,
              storedProfileInfo
            )
          )
  
          if (!storedProfileInfo) {
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
          } else {
            setProfileInfo(storedProfileInfo);
          }
  
          if (!storedMoviesCategories || !storedMovies) {
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
  
              const categoriesWithPreview = storedMoviesCategories.map((cat: XtreamSeriesCategory) => ({
                ...cat,
                preview: storedMovies
                  .filter((m: XtreamSeriesInfo) => m.category_id === cat.category_id)
                  .slice(0, 10)
                  .map(mapXtreamVodStreamToXtreamPreview),
              }));
  
              await db.put("movies_categories", categoriesWithPreview, "all");
              await db.put("movies", storedMovies, "all");
  
              storedMoviesCategories = categoriesWithPreview;
            }
  
            // Top 100 películas por rating
            let bestRatedMovies: XtreamPreview[] = [];
            if (storedMovies && storedMovies.length > 0) {
              bestRatedMovies = [...storedMovies]
                .sort(sortByRating)
                .slice(0, 100)
                .map(mapXtreamVodStreamToXtreamPreview);
            }
  
            // Elegir una aleatoria del top 100
            let randomMovieHero = bestRatedMovies.length > 0
                ? pickRandomXtreamPreview(bestRatedMovies)
                : undefined;
  
            setMoviesCategories(storedMoviesCategories || []);
            setMovies(storedMovies || []);
            setMoviesHero(randomMovieHero);
  
          if (!storedSeriesCategories || !storedSeries) {
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
  
              const categoriesWithPreview = storedSeriesCategories.map((cat: XtreamVodCategory) => ({
                ...cat,
                preview: storedSeries
                  .filter((m: XtreamVodStream) => m.category_id === cat.category_id)
                  .slice(0, 10)
                  .map(mapXtreamSeriesInfoToXtreamPreview),
              }));
  
              await db.put("series_categories", categoriesWithPreview, "all");
              await db.put("series", storedSeries, "all");
  
              storedSeriesCategories = categoriesWithPreview;
            }
  
            // Top 100 películas por rating
            let bestRatedSeries: XtreamPreview[] = [];
            if (storedSeries && storedSeries.length > 0) {
              bestRatedSeries = [...storedSeries]
                .sort(sortByRating)
                .slice(0, 100)
                .map(mapXtreamSeriesInfoToXtreamPreview);
            }
  
            // Elegir una aleatoria del top 100
            let randomSeriesHero = bestRatedSeries.length > 0
                ? pickRandomXtreamPreview(bestRatedSeries)
                : undefined;
  
            setSeriesCategories(storedSeriesCategories || []);
            setSeries(storedSeries || []);
            setSeriesHero(randomSeriesHero);
  
          if (!storedLiveCategories || !storedLive) {
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
                preview: storedLive
                  .filter((m: XtreamLiveStream) => m.category_id === cat.category_id)
                  .slice(0, 10)
                  .map(mapXtreamLiveStreamToXtreamPreview),
              }));
  
              await db.put("live_categories", categoriesWithPreview, "all");
              await db.put("live", storedLive, "all");
  
              storedLiveCategories = categoriesWithPreview;
            }
  
            setLiveCategories(storedLiveCategories || []);
            setLive(storedLive || []);

        } catch (err) {
          console.error("Error loading data:", err);
        } finally {
          setIsLoading(false);
        }
      }
  
      if (client) {
        fetchData();
      }
    }, [credentials, client]);
  
    return (
      <XtreamContext.Provider value={{
        profileInfo, 
        moviesCategories, 
        movies, 
        moviesHero, 
        seriesCategories, 
        series, 
        seriesHero, 
        liveCategories,
        live,
        profileDetails,
        isLoading,
        getVodInfo,
      }}>
        {children}
      </XtreamContext.Provider>
    );
  }
