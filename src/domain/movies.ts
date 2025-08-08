import { XTREAM_MEDIA_TYPES, xtreamDirectorsToDirector, XtreamPreview, XtreamPreviewDetail, XtreamVodInfoResponse, XtreamVodStream } from "@/domain/xtream";

export const ratingToRating5Based = (rating: number | string | null) => 
    (Number(rating) / 2).toFixed(2);

export const mapXtreamVodStreamToXtreamPreview = (
    vodStream: XtreamVodStream
): XtreamPreview => ({
    mediaType: XTREAM_MEDIA_TYPES.movies,
    num: vodStream.num,
    id: vodStream.stream_id,
    title: vodStream.name,
    cover: vodStream.stream_icon,
    rating5Based: vodStream.rating_5based,
    categoryIds: vodStream.category_ids,
});

export const mapXtreamVodinfoResponseToXtreamPreviewDetail = (
    response: XtreamVodInfoResponse
): XtreamPreviewDetail => {
    const cover = response.info.movie_image ?? response.info.backdrop_path?.at(0);
    const rating = response.info.rating;

    return {
        mediaType: XTREAM_MEDIA_TYPES.movies,
        id: response.movie_data.stream_id,
        title: response.movie_data.name,
        cover,
        coverBig: response.info.backdrop_path?.at(0) ?? cover,
        trailer: response.info.youtube_trailer,
        categoryId: Number(response.movie_data.category_id),
        categoryIds: response.movie_data.category_ids,
        rating,
        rating5Based: ratingToRating5Based(rating),
        releaseDate: response.info.releasedate,
        duration: response.info.duration,
        durationSecs: Number(response.info.duration_secs),
        runTime: response.info.runtime,
        director: xtreamDirectorsToDirector(response.info.director),
        directors: response.info.director,
        cast: response.info.cast,
        plot: response.info.plot,
        genre: response.info.genre,
        status: response.info.status,
    }
}