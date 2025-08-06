import { LiveStreamCard } from './live-stream-card';
import { CategoryHeader } from '../common/category-header';
import { XtreamCategoryWithPreview, XtreamMediaType } from '@/domain/xtream';

interface LiveStreamWrapperProps {
  mediaType: XtreamMediaType;
  category: XtreamCategoryWithPreview;
}

export function LiveStreamWrapper({ mediaType, category }: LiveStreamWrapperProps) {
  return (
    <div className="mt-10 w-full space-y-4 md:space-y-6 lg:space-y-8">
      <CategoryHeader title={category.category_name} href={`/${mediaType}/category/${category.category_id}`} />
      <div className="flex pb-2 overflow-x-auto snap-x snap-mandatory gap-3 md:gap-4 lg:gap-5 px-4 md:px-6 no-scrollbar">
        {category.preview.slice(0, 10).map(item => (
          <LiveStreamCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
