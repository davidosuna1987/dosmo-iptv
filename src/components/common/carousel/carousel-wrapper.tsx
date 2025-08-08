import { CarouselCard } from './carousel-card';
import { CategoryHeader } from '../category-header';
import { XtreamCategoryWithPreview, XtreamMediaType } from '@/domain/xtream';

interface CarouselWrapperProps {
  category: XtreamCategoryWithPreview;
}

export function CarouselWrapper({ category }: CarouselWrapperProps) {
  return (
    <div className="space-y-2">
      <CategoryHeader title={category.category_name} href={`/${category.mediaType}/category/${category.category_id}`} />
      <div className="flex pb-2 overflow-x-auto snap-x snap-mandatory gap-3 md:gap-4 lg:gap-5 px-4 md:px-6 no-scrollbar">
        {category.preview.slice(0, 10).map(item => (
          <CarouselCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
