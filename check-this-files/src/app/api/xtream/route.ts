import {NextResponse} from 'next/server';
import type {XtreamCredentials} from '@/types';

const API_PATH = 'player_api.php';

export async function POST(request: Request) {
  try {
    const {credentials, params} = (await request.json()) as {
      credentials: XtreamCredentials;
      params: Record<string, string>;
    };

    if (!credentials || !credentials.serverUrl || !credentials.username) {
      return NextResponse.json(
        {error: 'Missing credentials'},
        {status: 400}
      );
    }

    const url = new URL(API_PATH, credentials.serverUrl);
    const searchParams = new URLSearchParams({
      username: credentials.username,
      password: credentials.password || '',
      ...params,
    });
    url.search = searchParams.toString();

    // Some providers require a specific user-agent header
    const response = await fetch(url.toString(), {
      headers: {
        'User-Agent': 'IPTVSmarters',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        `Xtream API error for action ${params.action}: ${response.status} ${response.statusText}`,
        errorText
      );
      return NextResponse.json(
        {error: `Xtream API Error: ${response.statusText}`},
        {status: response.status}
      );
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error('Failed to fetch from Xtream API via proxy:', error);
    if (error instanceof Error) {
      return NextResponse.json(
        {error: 'Internal Server Error', message: error.message},
        {status: 500}
      );
    }
    return NextResponse.json({error: 'Internal Server Error'}, {status: 500});
  }
}
