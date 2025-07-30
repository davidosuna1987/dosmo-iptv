import { TopBar } from '@/components/TopBar';
import { liveSections } from '@/lib/data';
import { BottomNavBar } from '@/components/BottomNavBar';
import { LiveSection } from '@/components/LiveSection';

export default function LivePage() {
  return (
    <main className="min-h-screen bg-background text-white px-4 md:px-6">
    <TopBar />
    <div className="flex flex-col mt-6 space-y-4">
        {liveSections.map(section => (
            <LiveSection key={section.id} section={section} />
        ))}
    </div>
  </main>
  );
}
