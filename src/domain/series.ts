import { XtreamPreview, XtreamSeriesInfo } from "@/domain/xtream";

export const mapXtreamSeriesInfoToXtreamPreview = (
    seriesInfo: XtreamSeriesInfo
): XtreamPreview => ({
    id: seriesInfo.series_id,
    num: seriesInfo.num,
    name: seriesInfo.name,
    cover: seriesInfo.cover,
    rating: seriesInfo.rating,
    rating_5based: seriesInfo.rating_5based,
});