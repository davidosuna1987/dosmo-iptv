import Image from 'next/image';
import { XtreamPreview } from '@/domain/xtream';
import { safeUrl } from '@/domain/url';

interface LiveStreamCardProps {
  item: XtreamPreview;
}

export function LiveStreamCard({ item }: LiveStreamCardProps) {
  const secureUrl = safeUrl(item.cover)

  return (
    <div className="w-[31%] md:w-[23.5%] lg:w-[18.5%] flex-shrink-0 snap-start flex flex-col group rounded-lg overflow-hidden">
      <div className="aspect-square flex items-center justify-center overflow-hidden">
        <Image
          src={secureUrl}
          alt={item.title}
          width={200}
          height={300}
          className="object-cover w-full aspect-square group-hover:scale-110 transition-transform duration-200"
          data-ai-hint={`Poster de ${item.title}`}
          unoptimized
        />
      </div>
      <div className='bg-secondary group h-12 flex items-center px-2 pt-1'>
        <p className="text-xs font-semibold line-clamp-2 group-hover:text-primary">{item.title}</p>
      </div>
    </div>
  );
}
