
export interface EncryptedPassword {
    iv: number[];
    data: number[];
}

export interface XtreamCredentials {
    listName: string;
    serverUrl: string;
    username: string;
    password?: string;
    encryptedPassword?: EncryptedPassword;
}
  
export interface ContentItem {
    id: string;
    title: string;
    image: string;
    description?: string;
    isAdult?: boolean;
    data_ai_hint?: string;
    streamType: "movie" | "series" | "live";
}

export interface UserInfo {
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
  
export interface XtreamVodStream {
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
    container_extension: string;
    custom_sid: string | null;
    direct_source: string;
}
  
export interface XtreamVodCategory {
    category_id: string;
    category_name: string;
    parent_id: number;
}
  
export interface XtreamLiveCategory {
    category_id: string;
    category_name: string;
    parent_id: number;
}
  
export interface XtreamSeriesCategory {
    category_id: string;
    category_name: string;
    parent_id: number;
}
  
export interface XtreamSeriesInfo {
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
}
  
export interface XtreamMovieData {
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
export interface XtreamMovieInfo {
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
export interface XtreamVodInfoResponse {
    info: XtreamMovieInfo;
    movie_data: XtreamMovieData;
}
  
export interface XtreamEpisode {
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
  
export interface XtreamSeason {
    air_date: string;
    episode_count: number;
    id: number;
    name: string;
    overview: string;
    season_number: number;
    cover: string;
    cover_big: string;
}
  
export interface XtreamSeriesDetailResponse {
    info: XtreamSeriesInfo;
    episodes: {
        [season_number: string]: XtreamEpisode[];
    };
    seasons: XtreamSeason[];
}
  
export interface XtreamLiveStream {
    num: number;
    name: string;
    stream_type: 'live';
    stream_id: number;
    stream_icon: string;
    epg_channel_id: string | null;
    added: string;
    category_id: string;
    custom_sid: string | null;
    tv_archive: number;
    direct_source: string;
    tv_archive_duration: number;
}
