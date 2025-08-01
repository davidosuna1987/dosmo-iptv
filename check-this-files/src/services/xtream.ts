
import type {
  XtreamCredentials,
  XtreamVodStream,
  XtreamSeriesInfo,
  XtreamVodInfoResponse,
  XtreamSeriesDetailResponse,
  XtreamLiveStream,
  XtreamVodCategory,
  XtreamSeriesCategory,
  XtreamLiveCategory,
} from '@/types';

async function fetchFromXtreamAPI(
  credentials: XtreamCredentials,
  params: Record<string, string>
): Promise<any> {
  try {
    const response = await fetch('/api/xtream', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({credentials, params}),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error(
        `Xtream proxy API error for action ${params.action}. Status: ${response.status}`,
        errorBody
      );
      return null;
    }

    // Handle cases where the response might be empty but successful (e.g. 204 No Content)
    const text = await response.text();
    if (!text) {
      return null;
    }

    const data = JSON.parse(text);

    if (data.error) {
      console.error(
        'Error from Xtream proxy or invalid data format:',
        data.error || data
      );
      return null;
    }
    return data;
  } catch (error) {
    console.error('Failed to fetch from Xtream proxy API:', error);
    return null;
  }
}

export async function getVodStreams(
  credentials: XtreamCredentials,
  categoryId?: string
): Promise<XtreamVodStream[]> {
  const params: Record<string, string> = {action: 'get_vod_streams'};
  if (categoryId) {
    params.category_id = categoryId;
  }
  const data = await fetchFromXtreamAPI(credentials, params);
  return Array.isArray(data) ? data : [];
}

export async function getVodCategories(
  credentials: XtreamCredentials
): Promise<XtreamVodCategory[]> {
  const data = await fetchFromXtreamAPI(credentials, {action: 'get_vod_categories'});
  return Array.isArray(data) ? data : [];
}

export async function getSeries(
  credentials: XtreamCredentials,
  categoryId?: string
): Promise<XtreamSeriesInfo[]> {
  const params: Record<string, string> = {action: 'get_series'};
  if (categoryId) {
    params.category_id = categoryId;
  }
  const data = await fetchFromXtreamAPI(credentials, params);
  return Array.isArray(data) ? data : [];
}

export async function getSeriesCategories(
  credentials: XtreamCredentials
): Promise<XtreamSeriesCategory[]> {
  const data = await fetchFromXtreamAPI(credentials, {action: 'get_series_categories'});
  return Array.isArray(data) ? data : [];
}

export async function getLiveStreams(
  credentials: XtreamCredentials,
  categoryId?: string,
): Promise<XtreamLiveStream[]> {
  const params: Record<string, string> = {action: 'get_live_streams'};
  if (categoryId) {
    params.category_id = categoryId;
  }
  const data = await fetchFromXtreamAPI(credentials, params);
  return Array.isArray(data) ? data : [];
}

export async function getLiveStreamCategories(
  credentials: XtreamCredentials
): Promise<XtreamLiveCategory[]> {
  const data = await fetchFromXtreamAPI(credentials, { action: 'get_live_categories' });
  return Array.isArray(data) ? data : [];
}

export async function getVodInfo(
  credentials: XtreamCredentials,
  vodId: string
): Promise<XtreamVodInfoResponse | null> {
  return await fetchFromXtreamAPI(credentials, {
    action: 'get_vod_info',
    vod_id: vodId,
  });
}

export async function getSeriesInfo(
  credentials: XtreamCredentials,
  seriesId: string
): Promise<XtreamSeriesDetailResponse | null> {
  return await fetchFromXtreamAPI(credentials, {
    action: 'get_series_info',
    series_id: seriesId,
  });
}
