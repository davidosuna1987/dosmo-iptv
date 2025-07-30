import type { HomeSection } from '@/lib/data';
import { CarouselCard } from './CarouselCard';
import { CategoryHeader } from './CategoryHeader';

interface SectionProps {
  section: HomeSection;
}

export function Section({ section }: SectionProps) {
  return (
    <div className="space-y-2">
      <CategoryHeader title={section.title} href={section.seeAllRoute} />
      <div className="flex pb-2 overflow-x-auto snap-x snap-mandatory gap-3 px-4 md:px-6 no-scrollbar">
        {section.items.slice(0, 6).map(item => (
          <CarouselCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
