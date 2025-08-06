import { XtreamMovieInfo, XtreamPreview, XtreamVodStream } from "@/domain/xtream";

export const mapXtreamVodStreamToXtreamPreview = (
    vodStream: XtreamVodStream
): XtreamPreview => ({
    num: vodStream.num,
    name: vodStream.name,
    cover: vodStream.stream_icon,
    rating_5based: vodStream.rating_5based,
});

export const mapXtreamMovieInfoToXtreamPreview = (
    movieInfo: XtreamMovieInfo
): XtreamPreview => ({
    num: Number(movieInfo.tmdb_id),
    name: movieInfo.name,
    cover: movieInfo.movie_image,
    cover_big: movieInfo.cover_big,
    rating_5based: movieInfo.rating,
});