import type { LiveSection as LiveSectionType } from '@/lib/data';
import { LiveShowCard } from './live-show-card';
import { CategoryHeader } from '../common/category-header';

interface LiveSectionProps {
  section: LiveSectionType;
}

export function LiveSection({ section }: LiveSectionProps) {
  return (
    <div className="max-w-[1500px] mx-auto w-full space-y-4 md:space-y-6 lg:space-y-8">
      <CategoryHeader title={section.title} href={section.seeAllRoute} />
      <div className="flex pb-2 overflow-x-auto snap-x snap-mandatory gap-3 md:gap-4 lg:gap-5 px-4 md:px-6 no-scrollbar">
        {section.items.slice(0, 6).map(item => (
          <LiveShowCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
