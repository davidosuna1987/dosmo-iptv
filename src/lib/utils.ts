import { XTREAM_MEDIA_TYPES, XtreamMediaType } from "@/types"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const xtreamMediaTypeToString = (type: XtreamMediaType) => (
  type === XTREAM_MEDIA_TYPES.movies ? 'Películas' : type === XTREAM_MEDIA_TYPES.series ? 'Series' : 'Streaming'
)