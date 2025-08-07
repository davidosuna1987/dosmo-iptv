import Image from 'next/image';
import { XtreamPreview } from '@/domain/xtream';
import { safeUrl } from '@/domain/url';

interface ListItemProps {
  item: XtreamPreview;
}

export function ListItem({ item }: ListItemProps) {
  const secureUrl = safeUrl(item.cover)

  return (
    <div className="list-item relative w-full flex-shrink-0 snap-start overflow-hidden group">
      <Image
        src={secureUrl}
        alt={item.name}
        width={200}
        height={300}
        className="object-cover w-full rounded-md aspect-[2/3] group-hover:scale-110 transition-transform duration-200"
        data-ai-hint="movie poster"
      />
      <div className='absolute bottom-0 left-0 w-full bg-black/80 group h-12 flex items-center px-2 pt-1'>
        <p className="text-xs font-semibold line-clamp-2 group-hover:text-primary">{item.name}</p>
      </div>
    </div>
  );
}
