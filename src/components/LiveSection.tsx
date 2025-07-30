import type { LiveSection as LiveSectionType } from '@/lib/data';
import { LiveShowCard } from './LiveShowCard';
import Link from 'next/link';

interface LiveSectionProps {
  section: LiveSectionType;
}

export function LiveSection({ section }: LiveSectionProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-baseline justify-between">
        <h2 className="text-sm font-semibold tracking-wider text-muted-foreground">{section.title}</h2>
        <Link href={section.seeAllRoute} className="text-xs font-semibold tracking-wide uppercase text-primary hover:underline">
          Ver Todo
        </Link>
      </div>
      <div className="flex pb-2 overflow-x-auto snap-x snap-mandatory gap-3 no-scrollbar">
        {section.items.slice(0, 6).map(item => (
          <LiveShowCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
