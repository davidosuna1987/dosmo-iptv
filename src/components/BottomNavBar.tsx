"use client"
import Link from 'next/link';
import { Clapperboard, Library, Tv } from 'lucide-react';
import { usePathname } from 'next/navigation';

const BIcon = ({ className }: { className?: string }) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path d="M12.5833 6H9V18H12.5833C14.9363 18 16.8333 16.2091 16.8333 14C16.8333 11.7909 14.9363 10 12.5833 10C14.9363 10 16.8333 8.20914 16.8333 6C16.8333 3.79086 14.9363 2 12.5833 2H9V6" stroke="none" fill="currentColor" />
        <path d="M9 12H13.5C14.8807 12 16 13.1193 16 14.5C16 15.8807 14.8807 17 13.5 17H9V12Z" stroke="none" fill="currentColor" />
    </svg>
)

export function BottomNavBar() {
  const pathname = usePathname();
  const navItems = [
    { href: '/movies', icon: Clapperboard, label: 'Movies' },
    { href: '/series', icon: Library, label: 'Series' },
    { href: '/live', icon: Tv, label: 'Live' },
    { href: '/space', icon: BIcon, label: 'My Space' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-sm border-t border-border z-50">
      <div className="flex justify-around items-center h-16 text-xs">
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link href={item.href} key={item.label}>
              <div className={`flex flex-col items-center gap-1 ${active ? 'text-primary' : 'text-gray-400'}`}>
                <item.icon className={`h-6 w-6 ${item.label === 'My Space' && !active ? 'text-green-500' : ''}`} />
                <span>{item.label}</span>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  );
}
