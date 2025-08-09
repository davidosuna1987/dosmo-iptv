'use client';
import { XtreamRadioStation, XtreamRadioStationQuery } from '@/domain/radio';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

/**
 * Hook para obtener emisoras de radio desde /api/radio con filtros opcionales.
 * Incluye cancelación de peticiones y estado de carga/errores.
 */
export function useRadioStations(initialQuery: XtreamRadioStationQuery = {}) {
  const [stations, setStations] = useState<XtreamRadioStation[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState<XtreamRadioStationQuery>(initialQuery);
  const abortRef = useRef<AbortController | null>(null);

  const searchParams = useMemo(() => {
    const params = new URLSearchParams();
    if (query.q) params.set('q', query.q);
    if (query.country) params.set('country', query.country);
    if (query.language) params.set('language', query.language);
    if (query.tag) params.set('tag', query.tag);
    if (query.limit) params.set('limit', String(query.limit));
    if (query.offset) params.set('offset', String(query.offset));
    if (query.order) params.set('order', query.order);
    if (query.reverse) params.set('reverse', 'true');
    return params.toString();
  }, [query]);

  const fetchStations = useCallback(async () => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setIsLoading(true);
    setError(null);
    try {
      const url = '/api/radio' + (searchParams ? `?${searchParams}` : '');
      const res = await fetch(url, { signal: controller.signal, cache: 'force-cache' });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      const items: XtreamRadioStation[] = (json.stations || []).map((s: any) => ({
        id: s.id,
        name: s.name,
        favicon: s.favicon,
        homepage: s.homepage,
        country: s.country,
        state: s.state,
        language: s.language,
        bitrate: s.bitrate,
        codec: s.codec,
        url: s.url,
        tags: s.tags,
      }));
      setStations(items);
    } catch (e: any) {
      if (e?.name !== 'AbortError') setError(e?.message || 'Error fetching stations');
    } finally {
      setIsLoading(false);
    }
  }, [searchParams]);

  useEffect(() => {
    fetchStations();
    return () => abortRef.current?.abort();
  }, [fetchStations]);

  return { stations, isLoading, error, query, setQuery, refetch: fetchStations } as const;
}