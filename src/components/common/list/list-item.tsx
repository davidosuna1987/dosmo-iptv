
import Image from 'next/image';
import Link from 'next/link';
import { XtreamPreview, XTREAM_MEDIA_TYPES } from '@/domain/xtream';
import { safeUrl } from '@/domain/url';

interface ListItemProps {
  item: XtreamPreview;
}

// Function to determine media type, this is a placeholder
// you might need a more robust way to determine this
const getMediaType = (item: XtreamPreview) => {
    // Basic check, you might need to refine this
    if (item.category_ids?.length > 0) {
        // This is a guess, assuming movie based on your structure.
        // A better approach would be to have the media type in the item itself.
        return XTREAM_MEDIA_TYPES.movies; 
    }
    return XTREAM_MEDIA_TYPES.movies;
}


export function ListItem({ item }: ListItemProps) {
  const secureUrl = safeUrl(item.cover);
  const mediaType = getMediaType(item);
  const detailUrl = `/${mediaType}/${item.id}`;


  return (
    <Link href={detailUrl} className="list-item relative w-full flex-shrink-0 snap-start overflow-hidden group">
      <Image
        src={secureUrl}
        alt={item.title}
        width={200}
        height={300}
        className="object-cover w-full rounded-md aspect-[2/3] group-hover:scale-110 transition-transform duration-200"
        data-ai-hint="movie poster"
      />
      <div className='absolute bottom-0 left-0 w-full bg-black/80 group h-12 flex items-center px-2 pt-1'>
        <p className="text-xs font-semibold line-clamp-2 group-hover:text-primary">{item.title}</p>
      </div>
    </Link>
  );
}
