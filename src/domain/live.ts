import { XtreamLiveStream, XtreamPreview } from "@/domain/xtream";

export const mapXtreamLiveStreamToXtreamPreview = (
    liveStream: XtreamLiveStream
): XtreamPreview => ({
    num: liveStream.num,
    id: liveStream.stream_id,
    name: liveStream.name,
    cover: liveStream.stream_icon,
})