import Image from 'next/image';
import { XtreamPreview } from '@/domain/xtream';
import { safeUrl } from '@/domain/url';

interface LiveStreamListItemProps {
  item: XtreamPreview;
}

export function LiveStreamListItem({ item }: LiveStreamListItemProps) {
  const secureUrl = safeUrl(item.cover)

  return (
    <div className="w-full flex-shrink-0 snap-start flex flex-col group rounded-lg overflow-hidden">
      <div className="aspect-square flex items-center justify-center overflow-hidden">
        <Image
          src={secureUrl}
          alt={item.name}
          width={200}
          height={300}
          className="object-cover w-full aspect-square group-hover:scale-110 transition-transform duration-200"
          data-ai-hint="live stream poster"
          unoptimized // Added because the image domains from the API are unknown
        />
      </div>
      <p className="text-center bg-secondary text-xs font-semibold truncate py-3 px-2">{item.name}</p>
    </div>
  );
}
