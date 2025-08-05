import { XtreamLiveStream, XtreamPreview } from "@/types";

export const mapXtreamLiveStreamToXtreamPreview = (
    liveStream: XtreamLiveStream
): XtreamPreview => ({
    num: liveStream.num,
    name: liveStream.name,
    cover: liveStream.stream_icon,
})