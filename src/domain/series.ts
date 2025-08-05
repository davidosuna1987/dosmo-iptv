import { XtreamPreview, XtreamSeriesInfo } from "@/types";

export const mapXtreamSeriesInfoToXtreamPreview = (
    seriesInfo: XtreamSeriesInfo
): XtreamPreview => ({
    num: seriesInfo.num,
    name: seriesInfo.name,
    cover: seriesInfo.cover,
    rating: seriesInfo.rating,
    rating_5based: seriesInfo.rating_5based,
});