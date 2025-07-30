import type { HomeSection } from '@/lib/data';
import { CarouselCard } from './carousel-card';
import { CategoryHeader } from '../category-header';

interface CarouselWrapperProps {
  section: HomeSection;
}

export function CarouselWrapper({ section }: CarouselWrapperProps) {
  return (
    <div className="space-y-2">
      <CategoryHeader title={section.title} href={section.seeAllRoute} />
      <div className="flex pb-2 overflow-x-auto snap-x snap-mandatory gap-3 md:gap-4 lg:gap-5 px-4 md:px-6 no-scrollbar">
        {section.items.slice(0, 6).map(item => (
          <CarouselCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
