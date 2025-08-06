import { WithRating } from "@/domain/xtream";

export function sortByRating<T extends WithRating>(a: T, b: T) {
    return 'rating' in a && 'rating' in b ? 
        parseFloat(b.rating?.toString() || "0") -
        parseFloat(a.rating?.toString() || "0") :
        'rating_5based' in a && 'rating_5based' in b ?
            parseFloat(b.rating_5based?.toString() || "0") -
            parseFloat(a.rating_5based?.toString() || "0") :
            0 - 0;
  }
  
