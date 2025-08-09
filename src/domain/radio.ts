export type XtreamRadioStationResponse = {
    count: number
    offset: number
    limit: number
    stations: XtreamRadioStation[]
}
  
export type XtreamRadioStation = {
    id: string
    name: string
    url: string
    homepage?: string
    favicon: string
    country: string
    state: string
    language: string
    tags: string[]
    bitrate: number
    codec: string
}

export type XtreamRadioStationQuery = {
    q?: string;
    country?: string;
    language?: string;
    tag?: string;
    limit?: number;
    offset?: number;
    order?: 'name' | 'clickcount' | 'bitrate';
    reverse?: boolean;
  };