"use client"
import Link from 'next/link';
import { Clapperboard, Library, Tv } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { DosmoIptvLogo } from '../dosmo-iptv-logo';

export function BottomNavBar() {
  const pathname = usePathname();
  const navItems = [
    { href: '/movies', icon: Clapperboard, label: 'Películas' },
    { href: '/series', icon: Library, label: 'Series' },
    { href: '/live', icon: Tv, label: 'Live' },
    { href: '/profile', icon: DosmoIptvLogo, label: 'Perfil' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-sm border-t border-border z-50">
      <div className="flex justify-around items-center h-16 text-xs">
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link href={item.href} key={item.label}>
              <div className={`flex flex-col items-center gap-1 ${active ? 'text-primary' : 'text-gray-400 hover:text-white'}`}>
                <item.icon className={`h-6 w-6 ${item.label === 'Perfil' && 'text-primary'}`} />
                <span>{item.label}</span>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  );
}
