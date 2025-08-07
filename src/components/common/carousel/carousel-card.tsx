
import Image from 'next/image';
import { XtreamMediaType, XtreamPreview, xtreamMediaTypeToString } from '@/domain/xtream';
import { safeUrl } from '@/domain/url';

interface CarouselCardProps {
  mediaType: XtreamMediaType
  item: XtreamPreview;
}

export function CarouselCard({ mediaType, item }: CarouselCardProps) {
  const secureUrl = safeUrl(item.cover);

  return (
    <div className="w-[31%] md:w-[23.5%] lg:w-[18.5%] flex-shrink-0 snap-start overflow-hidden group">
      <Image
        src={secureUrl}
        alt={item.title}
        width={200}
        height={300}
        className="object-cover w-full rounded-md aspect-[2/3] group-hover:scale-110 transition-transform duration-200"
        data-ai-hint={`${xtreamMediaTypeToString(mediaType)} poster`}
        unoptimized // Added because the image domains from the API are unknown
      />
    </div>
  );
}
