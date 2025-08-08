import { XTREAM_MEDIA_TYPES, XtreamLiveStream, XtreamPreview } from "@/domain/xtream";

export const mapXtreamLiveStreamToXtreamPreview = (
    liveStream: XtreamLiveStream
): XtreamPreview => ({
    mediaType: XTREAM_MEDIA_TYPES.live,
    num: liveStream.num,
    id: liveStream.stream_id,
    title: liveStream.name,
    cover: liveStream.stream_icon,
    cover_big: liveStream.stream_icon,
    category_ids: liveStream.category_ids,
});