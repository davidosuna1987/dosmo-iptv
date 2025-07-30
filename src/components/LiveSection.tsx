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
      <div className="grid grid-cols-2 gap-4">
        {section.items.map(item => (
          <LiveShowCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
