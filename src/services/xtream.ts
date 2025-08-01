import type {
  XtreamCredentials,
  XtreamLiveCategory,
  XtreamLiveStream,
  XtreamSeriesCategory,
  XtreamSeriesInfo,
  XtreamUserInfo,
  XtreamVodCategory,
  XtreamVodStream,
  XtreamVodDetails,
  XtreamSeriesDetails,
} from '@/types';

export class XtreamClient {
  private readonly credentials: XtreamCredentials;
  private readonly baseUrl: string;

  constructor(credentials: XtreamCredentials) {
    this.credentials = credentials;
    this.baseUrl = this.prepareBaseUrl(credentials.serverUrl);
  }

  private prepareBaseUrl(serverUrl: string): string {
    if (!/^(https?:\/\/)/.test(serverUrl)) {
      return `http://${serverUrl}`;
    }
    return serverUrl;
  }

  private async fetchAPI<T>(action: string, params: Record<string, string> = {}): Promise<T> {
    const url = new URL(this.baseUrl);
    url.searchParams.set('username', this.credentials.username);
    url.searchParams.set('password', this.credentials.password);
    url.searchParams.set('action', action);
    for (const key in params) {
      url.searchParams.set(key, params[key]);
    }

    const response = await fetch(url.toString());
    if (!response.ok) {
        throw new Error(`API call failed: ${response.statusText}`);
    }
    return response.json();
  }

  async getUserInfo(): Promise<XtreamUserInfo> {
    const data = await this.fetchAPI<{ user_info: XtreamUserInfo }>('get_user_info');
    return data.user_info;
  }

  async getVodStreams(categoryId?: string): Promise<XtreamVodStream[]> {
    const params = categoryId ? { category_id: categoryId } : {};
    return await this.fetchAPI<XtreamVodStream[]>('get_vod_streams', params);
  }

  async getSeries(categoryId?: string): Promise<XtreamSeriesInfo[]> {
    const params = categoryId ? { category_id: categoryId } : {};
    return await this.fetchAPI<XtreamSeriesInfo[]>('get_series', params);
  }

  async getLiveStreams(categoryId?: string): Promise<XtreamLiveStream[]> {
    const params = categoryId ? { category_id: categoryId } : {};
    return await this.fetchAPI<XtreamLiveStream[]>('get_live_streams', params);
  }

  async getVodCategories(): Promise<XtreamVodCategory[]> {
    return await this.fetchAPI<XtreamVodCategory[]>('get_vod_categories');
  }

  async getSeriesCategories(): Promise<XtreamSeriesCategory[]> {
    return await this.fetchAPI<XtreamSeriesCategory[]>('get_series_categories');
  }

  async getLiveCategories(): Promise<XtreamLiveCategory[]> {
    return await this.fetchAPI<XtreamLiveCategory[]>('get_live_categories');
  }
  
  async getVodCategoriesWithContent(limit: number = 10): Promise<XtreamVodCategory[]> {
    const categories = await this.getVodCategories();
    const categoriesWithContent = await Promise.all(
      categories.map(async (category) => {
        const streams = await this.getVodStreams(category.category_id);
        return { ...category, items: streams.slice(0, limit) };
      })
    );
    return categoriesWithContent;
  }

  async getSeriesCategoriesWithContent(limit: number = 10): Promise<XtreamSeriesCategory[]> {
    const categories = await this.getSeriesCategories();
    const categoriesWithContent = await Promise.all(
      categories.map(async (category) => {
        const series = await this.getSeries(category.category_id);
        return { ...category, items: series.slice(0, limit) };
      })
    );
    return categoriesWithContent;
  }

  async getLiveCategoriesWithContent(limit: number = 10): Promise<XtreamLiveCategory[]> {
    const categories = await this.getLiveCategories();
    const categoriesWithContent = await Promise.all(
      categories.map(async (category) => {
        const streams = await this.getLiveStreams(category.category_id);
        return { ...category, items: streams.slice(0, limit) };
      })
    );
    return categoriesWithContent;
  }

  async getVodInfo(vodId: string): Promise<XtreamVodDetails> {
    return await this.fetchAPI<XtreamVodDetails>('get_vod_info', { vod_id: vodId });
  }

  async getSeriesInfo(seriesId: string): Promise<XtreamSeriesDetails> {
    return await this.fetchAPI<XtreamSeriesDetails>('get_series_info', { series_id: seriesId });
  }
}
