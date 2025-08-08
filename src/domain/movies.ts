import { XTREAM_MEDIA_TYPES, XtreamPreview, XtreamVodStream } from "@/domain/xtream";

export const mapXtreamVodStreamToXtreamPreview = (
    vodStream: XtreamVodStream
): XtreamPreview => ({
    mediaType: XTREAM_MEDIA_TYPES.movies,
    num: vodStream.num,
    id: vodStream.stream_id,
    title: vodStream.name,
    cover: vodStream.stream_icon,
    rating_5based: vodStream.rating_5based,
    category_ids: vodStream.category_ids,
});