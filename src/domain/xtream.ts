export type WithRating = { 
    rating?: number | string | null;
    rating_5based?: number | string | null
};

export type EncryptedPassword = {
    iv: number[];
    data: number[];
}

export type XtreamCredentials = {
    listName: string;
    serverUrl: string;
    username: string;
    password?: string;
    encryptedPassword?: EncryptedPassword;
}

export const XTREAM_MEDIA_TYPES = {
    movies: "movies",
    series: "series",
    live: "live",
} as const

export type XtreamMediaType = keyof typeof XTREAM_MEDIA_TYPES

export type UserInfo = {
    username: string;
    password?: string;
    message: string;
    auth: number;
    status: string;
    exp_date: string;
    is_trial: string;
    active_cons: string;
    created_at: string;
    max_connections: string;
    allowed_output_formats: string[];
}

export type ServerInfo = {
    url: string;
    port: string;
    https_port: string;
    server_protocol: string;
    rtmp_port: string;
    timezone: string;
    timestamp_now: number;
    time_now: string;
    process: boolean;
}

export type XtreamInfo = {
    moviesCount: number;
    seriesCount: number;
    liveCount: number;
}

export type ProfileInfo = {
    user_info: UserInfo;
    server_info: ServerInfo;
}

export type ProfileDetails = XtreamInfo & {
    listName: string;
    username: string;
    serverUrl: string;
    timeZone: string;
    daysLeft: string;
    startDate: string;
    endDate: string;
    maxConnections: string;
    appVersion: string;
    status: string;
}
  
export type XtreamVodStream = {
    num: number;
    name: string;
    stream_type: "movie";
    stream_id: number;
    stream_icon: string;
    rating: string | null;
    rating_5based: number;
    added: string;
    is_adult: number;
    category_id: string;
    category_ids: number[];
    container_extension: string;
    custom_sid: string | null;
    direct_source: string;
}

export type XtreamPreview = {
    num: number,
    id: number,
    name: string,
    cover: string,
    cover_big?: string,
    rating?: number | string | null,
    rating_5based?: number | string | null,
    category_ids: number[],
}

export type XtreamCategoryWithPreview = {
    category_id: string;
    category_name: string;
    parent_id: number;
    preview: XtreamPreview[];
}
  
export type XtreamVodCategory = {
    category_id: string;
    category_name: string;
    parent_id: number;
    preview: XtreamVodStream[];
}
  
export type XtreamLiveCategory = {
    category_id: string;
    category_name: string;
    parent_id: number;
    preview: XtreamLiveStream[];
}
  
export type XtreamSeriesCategory = {
    category_id: string;
    category_name: string;
    parent_id: number;
    preview: XtreamSeriesInfo[];
}
  
export type XtreamSeriesInfo = {
    num: number;
    name: string;
    series_id: number;
    cover: string;
    plot: string | null;
    cast: string | null;
    director: string | null;
    genre: string | null;
    releaseDate: string | null;
    last_modified: string;
    rating: string | null;
    rating_5based: number;
    backdrop_path: string[];
    youtube_trailer: string;
    episode_run_time: string;
    category_id: string;
    category_ids: number[];
}
  
export type XtreamMovieData = {
    stream_id: number;
    name: string;
    added: string;
    category_id: string;
    container_extension: string;
    custom_sid: null | string;
    direct_source: string;
    rating: null | string;
    rating_5based: number;
    stream_icon: string;
    plot: null | string;
    cast: null | string;
    director: null | string;
    genre: null | string;
    releaseDate: null | string;
    duration_secs: number;
    duration: string;
    backdrop_path: string[];
}
export type XtreamMovieInfo = {
    kinopoisk_url: string;
    tmdb_id: string;
    name: string;
    o_name: string;
    cover_big: string;
    movie_image: string;
    releasedate: string;
    episode_run_time: string;
    youtube_trailer: string;
    director: string;
    actors: string;
    cast: string;
    description: string;
    plot: string;
    age: string;
    mpaa_rating: string;
    rating_count_kinopoisk: number;
    country: string;
    genre: string;
    backdrop_path: string[];
    duration_secs: number;
    duration: string;
    rating: number;
}
export type XtreamVodInfoResponse = {
    info: XtreamMovieInfo;
    movie_data: XtreamMovieData;
}
  
export type XtreamEpisode = {
    id: string;
    episode_num: number;
    title: string;
    container_extension: string;
    info: {
        tmdb_id: string;
        releasedate: string;
        plot: string;
        duration_secs: number;
        duration: string;
        movie_image: string;
        video: Record<string, unknown>;
        audio: Record<string, unknown>;
        bitrate: number;
        rating: number;
        name: string;
        season: number;
    };
    custom_sid: string;
    added: string;
    season: number;
    direct_source: string;
}
  
export type XtreamSeason = {
    air_date: string;
    episode_count: number;
    id: number;
    name: string;
    overview: string;
    season_number: number;
    cover: string;
    cover_big: string;
}
  
export type XtreamSeriesDetailResponse = {
    info: XtreamSeriesInfo;
    episodes: {
        [season_number: string]: XtreamEpisode[];
    };
    seasons: XtreamSeason[];
}
  
export type XtreamLiveStream = {
    num: number;
    name: string;
    stream_type: 'live';
    stream_id: number;
    stream_icon: string;
    epg_channel_id: string | null;
    added: string;
    category_id: string;
    category_ids: number[];
    custom_sid: string | null;
    tv_archive: number;
    direct_source: string;
    tv_archive_duration: number;
}

export const XTREAM_MEDIA_TYPES_TO_STRING = {
    [XTREAM_MEDIA_TYPES.movies]: 'Películas',
    [XTREAM_MEDIA_TYPES.series]: 'Series',
    [XTREAM_MEDIA_TYPES.live]: 'Streaming',
} as const

export const xtreamMediaTypeToString = (mediaType: XtreamMediaType) =>
    XTREAM_MEDIA_TYPES_TO_STRING[mediaType]