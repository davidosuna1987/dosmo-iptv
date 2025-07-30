import type { LiveSection as LiveSectionType } from '@/lib/data';
import { LiveShowCard } from './live-show-card';
import { CategoryHeader } from '../common/category-header';

interface LiveSectionProps {
  section: LiveSectionType;
}

export function LiveSection({ section }: LiveSectionProps) {
  return (
    <div className="space-y-4">
      <CategoryHeader title={section.title} href={section.seeAllRoute} />
      <div className="flex pb-2 overflow-x-auto snap-x snap-mandatory gap-3 no-scrollbar">
        {section.items.slice(0, 6).map(item => (
          <LiveShowCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
