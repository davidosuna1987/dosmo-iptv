
import type {
    XtreamCredentials,
    XtreamLiveCategory,
    XtreamLiveStream,
    XtreamSeriesCategory,
    XtreamSeriesDetailResponse,
    XtreamSeriesInfo,
    XtreamVodCategory,
    XtreamVodInfoResponse,
    XtreamVodStream,
    UserInfo
} from '@/types';
import { useEncryptedPassword } from '@/hooks/use-encrypted-password';


export class XtreamClient {
    private credentials: Omit<XtreamCredentials, 'listName' | 'encryptedPassword'>;
    
    constructor(credentials: Omit<XtreamCredentials, 'listName' | 'encryptedPassword'>) {
        this.credentials = credentials;
    }

    private async fetchAPI<T>(params: Record<string, string>): Promise<T | null> {
        try {
            const response = await fetch('/api/xtream', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ credentials: this.credentials, params }),
            });

            if (!response.ok) {
                const errorBody = await response.text();
                console.error(`Xtream proxy API error for action ${params.action}. Status: ${response.status}`, errorBody);
                return null;
            }

            const text = await response.text();
            if (!text) return null;

            const data = JSON.parse(text);
            if (data.error) {
                console.error('Error from Xtream proxy or invalid data format:', data.error || data);
                return null;
            }

            return data as T;
        } catch (error) {
            console.error('Failed to fetch from Xtream proxy API:', error);
            return null;
        }
    }
    
    async getProfileInfo(): Promise<UserInfo | null> {
        const response = await this.fetchAPI<{ user_info: UserInfo, server_info: any }>({ action: 'get_user_info' });
        return response ? response.user_info : null;
    }

    async getVodStreams(categoryId?: string): Promise<XtreamVodStream[]> {
        const params: Record<string, string> = { action: 'get_vod_streams' };
        if (categoryId) params.category_id = categoryId;
        const data = await this.fetchAPI<XtreamVodStream[]>(params);
        return Array.isArray(data) ? data : [];
    }

    async getSeries(categoryId?: string): Promise<XtreamSeriesInfo[]> {
        const params: Record<string, string> = { action: 'get_series' };
        if (categoryId) params.category_id = categoryId;
        const data = await this.fetchAPI<XtreamSeriesInfo[]>(params);
        return Array.isArray(data) ? data : [];
    }

    async getLiveStreams(categoryId?: string): Promise<XtreamLiveStream[]> {
        const params: Record<string, string> = { action: 'get_live_streams' };
        if (categoryId) params.category_id = categoryId;
        const data = await this.fetchAPI<XtreamLiveStream[]>(params);
        return Array.isArray(data) ? data : [];
    }

    async getVodCategories(): Promise<XtreamVodCategory[]> {
        const data = await this.fetchAPI<XtreamVodCategory[]>({ action: 'get_vod_categories' });
        return Array.isArray(data) ? data : [];
    }

    async getSeriesCategories(): Promise<XtreamSeriesCategory[]> {
        const data = await this.fetchAPI<XtreamSeriesCategory[]>({ action: 'get_series_categories' });
        return Array.isArray(data) ? data : [];
    }

    async getLiveCategories(): Promise<XtreamLiveCategory[]> {
        const data = await this.fetchAPI<XtreamLiveCategory[]>({ action: 'get_live_categories' });
        return Array.isArray(data) ? data : [];
    }

    async getVodCategoriesWithContent(): Promise<(XtreamVodCategory & { items: XtreamVodStream[] })[]> {
        const categories = await this.getVodCategories();
        const categoriesWithContent = await Promise.all(
            categories.map(async (category) => {
                const items = await this.getVodStreams(category.category_id);
                return { ...category, items: items.slice(0, 10) };
            })
        );
        return categoriesWithContent;
    }

    async getSeriesCategoriesWithContent(): Promise<(XtreamSeriesCategory & { items: XtreamSeriesInfo[] })[]> {
        const categories = await this.getSeriesCategories();
        const categoriesWithContent = await Promise.all(
            categories.map(async (category) => {
                const items = await this.getSeries(category.category_id);
                return { ...category, items: items.slice(0, 10) };
            })
        );
        return categoriesWithContent;
    }

    async getLiveCategoriesWithContent(): Promise<(XtreamLiveCategory & { items: XtreamLiveStream[] })[]> {
        const categories = await this.getLiveCategories();
        const categoriesWithContent = await Promise.all(
            categories.map(async (category) => {
                const items = await this.getLiveStreams(category.category_id);
                return { ...category, items: items.slice(0, 10) };
            })
        );
        return categoriesWithContent;
    }

    async getVodInfo(vodId: string): Promise<XtreamVodInfoResponse | null> {
        return this.fetchAPI<XtreamVodInfoResponse>({ action: 'get_vod_info', vod_id: vodId });
    }

    async getSeriesInfo(seriesId: string): Promise<XtreamSeriesDetailResponse | null> {
        return this.fetchAPI<XtreamSeriesDetailResponse>({ action: 'get_series_info', series_id: seriesId });
    }
}

export function useXtreamClient() {
    const { decrypt } = useEncryptedPassword();

    const getClient = async (credentials: XtreamCredentials): Promise<XtreamClient | null> => {
        if (!credentials.encryptedPassword) {
            console.error("No encrypted password found in credentials");
            return null;
        }
        
        const password = await decrypt(credentials.encryptedPassword);
        if (!password) {
            console.error("Failed to decrypt password");
            return null;
        }

        const clientCredentials = {
            serverUrl: credentials.serverUrl,
            username: credentials.username,
            password: password,
        };
        return new XtreamClient(clientCredentials);
    };

    return { getClient };
}
