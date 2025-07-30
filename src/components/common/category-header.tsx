import Link from 'next/link';

interface CategoryHeaderProps {
    title: string;
    href?: string;
  }

export function CategoryHeader({ title, href }: CategoryHeaderProps) {
  return (
    <header className="flex items-baseline justify-between mb-2">
        <h2 className="font-semibold">{title}</h2>
        {href && (
            <Link href={href} className="text-xs font-semibold tracking-wide uppercase text-primary hover:underline">
                Ver Todo
            </Link>
        )}
    </header>
  );
}


