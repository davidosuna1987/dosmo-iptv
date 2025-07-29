import type { HomeSection } from '@/lib/data';
import { CarouselCard } from './CarouselCard';
import Link from 'next/link';

interface SectionProps {
  section: HomeSection;
}

export function Section({ section }: SectionProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-baseline justify-between mb-2">
        <h2 className="text-xl font-semibold">{section.title}</h2>
        <Link href={section.seeAllRoute} className="text-xs font-semibold tracking-wide uppercase text-neutral-400 hover:text-white">
          Ver Todo ›
        </Link>
      </div>
      <div className="flex pb-2 -mx-4 overflow-x-auto snap-x snap-mandatory gap-3 px-4 md:-mx-6 md:px-6">
        {section.items.slice(0, 6).map(item => (
          <CarouselCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
