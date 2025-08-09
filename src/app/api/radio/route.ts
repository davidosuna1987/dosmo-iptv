import { XtreamRadioStation, XtreamRadioStationQuery } from "@/domain/radio";
import { NextResponse } from "next/server";

/**
 * Mirrors públicos de Radio Browser.
  * Probamos varios por si alguno está caído/lento.
   */
const RADIO_BROWSER_MIRRORS = [
  "https://de1.api.radio-browser.info",
  "https://de2.api.radio-browser.info",
  "https://nl1.api.radio-browser.info",
  "https://fr1.api.radio-browser.info",
] as const;

/**
 * GET /api/radio
  *
   * Query params soportados:
    * - q: texto de búsqueda (nombre/tags)
     * - country: país (e.g. Spain)
      * - language: idioma (e.g. Spanish)
       * - tag: género/etiqueta (e.g. pop)
        * - limit: nº de resultados (default 200, máx 500)
         * - offset: para paginación (default 0)
          * - order: campo de orden (name|clickcount|bitrate) default clickcount
           * - reverse: "true" para invertido
            */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const q = (searchParams.get("q") || "").trim();
  const country = (searchParams.get("country") || "").trim();
  const language = (searchParams.get("language") || "").trim();
  const tag = (searchParams.get("tag") || "").trim();

  const limit = clamp(Number(searchParams.get("limit") || 200), 1, 500);
  const offset = Math.max(0, Number(searchParams.get("offset") || 0));

  const order = (searchParams.get("order") ?? 'clickcount').toLowerCase() as ('name' | 'clickcount' | 'bitrate');
  const reverse = (searchParams.get("reverse") || "false").toLowerCase() === "true";

  try {
    const urlPath = buildSearchPath({
      q,
      country,
      language,
      tag,
      limit,
      offset,
      order,
      reverse,
    });

    const json = await fetchFromMirrors(urlPath);

    const stations: XtreamRadioStation[] = (json as any[]).map((s) => ({
      id: s.id,
      name: s.name,
      url: (s.url_resolved || s.url || '').trim(),
      homepage: (s.homepage || s.homepage_url || s.homepage_resolved || '').trim(),
      favicon: (s.favicon || '').trim(),
      country: s.country,
      state: s.state,
      language: Array.isArray(s.language) ? s.language[0] : s.language,
      tags: typeof s.tags === "string" ? s.tags.split(",").map((t: string) => t.trim()).filter(Boolean) : [],
      bitrate: s.bitrate,
      codec: s.codec,
    }));

    // Cabeceras de caché (edge) + revalidate de Next
    const res = NextResponse.json(
      { count: stations.length, offset, limit, stations },
      {
        headers: {
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
        },
      }
    );
    // @ts-ignore — hint para el runtime de Next
    (res as any).headers.set("CDN-Cache-Control", "public, s-maxage=3600");
    // @ts-ignore
    (res as any).headers.set("Vercel-CDN-Cache-Control", "public, s-maxage=3600");

    return res;
  } catch (err: any) {
    return NextResponse.json(
      { error: "Failed to fetch radio stations", details: String(err?.message || err) },
      { status: 502 }
    );
  }
}

/** Construye el path de búsqueda para Radio Browser API */
function buildSearchPath(opts: XtreamRadioStationQuery) {
  // Usamos el endpoint de búsqueda flexible
  const params = new URLSearchParams();

  // Filtros comunes (RB permite varios campos; usamos los más útiles)
  if (opts.q) params.set("name", opts.q);
  if (opts.country) params.set("country", opts.country);
  if (opts.language) params.set("language", opts.language);
  if (opts.tag) params.set("tag", opts.tag);

  params.set("limit", String(opts.limit));
  params.set("offset", String(opts.offset));
  params.set("order", mapOrder(opts.order));
  if (opts.reverse) params.set("reverse", "true");
  // Pedimos URLs resueltas y que estén "ok"
  params.set("hidebroken", "true");

  // /json/stations/search?...
  return `/json/stations/search?${params.toString()}`;
}

/** Traduce el order legible a los campos de RB */
function mapOrder(order?: string) {
  switch (order) {
    case "name":
      return "name";
    case "bitrate":
      return "bitrate";
    case "clickcount":
    default:
      return "clickcount";
  }
}

/** Intenta llamar a varios mirrors hasta obtener respuesta */
async function fetchFromMirrors(path: string) {
  let lastError: any;
  for (const base of RADIO_BROWSER_MIRRORS) {
    const url = `${base}${path}`;
    try {
      const res = await fetch(url, {
        // Next revalidate a 1h
        next: { revalidate: 3600 },
        headers: {
          "User-Agent": "DosmoIPTV/1.0 (Radio Browser client)",
        },
      });
      if (!res.ok) {
        lastError = new Error(`HTTP ${res.status} at ${base}`);
        continue;
      }
      return await res.json();
    } catch (e) {
      lastError = e;
      // probar siguiente mirror
      continue;
    }
  }
  throw lastError ?? new Error("All Radio Browser mirrors failed");
}

function clamp(n: number, min: number, max: number) {
  if (Number.isNaN(n)) return min;
  return Math.max(min, Math.min(max, n));
}