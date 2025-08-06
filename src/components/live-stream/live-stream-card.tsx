import Image from 'next/image';
import { XtreamPreview } from '@/domain/xtream';
import { httpToHttps } from '@/domain/url';

interface LiveStreamCardProps {
  item: XtreamPreview;
}

export function LiveStreamCard({ item }: LiveStreamCardProps) {
  const safeUrl = httpToHttps(item.cover)

  return (
    <div className="w-[31%] md:w-[23.5%] lg:w-[18.5%] bg-secondary flex-shrink-0 snap-start flex flex-col gap-2 group rounded-lg overflow-hidden">
      <div className="aspect-square flex items-center justify-center overflow-hidden bg-secondary">
        <Image
          src={safeUrl}
          alt={item.name}
          width={200}
          height={300}
          className="object-cover w-full aspect-square group-hover:scale-110 transition-transform duration-200"
          data-ai-hint="live stream poster"
          unoptimized // Added because the image domains from the API are unknown
        />
      </div>
      {/* <p className="text-center text-xs font-semibold truncate mt-2 mb-3">{item.name}</p> */}
    </div>
  );
}
