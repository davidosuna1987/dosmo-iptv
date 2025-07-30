import { BottomNavBar } from '@/components/BottomNavBar';
import { MySpace } from '@/components/MySpace';
import { TopBar } from '@/components/TopBar';

export default function MySpacePage() {
  return (
    <main className="min-h-screen bg-background text-white px-4 md:px-6">
      <TopBar />
      <MySpace />
      <div className="pb-24" />
      <BottomNavBar />
    </main>
  );
}
