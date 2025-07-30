import { TopBar } from '@/components/TopBar';
import { Hero } from '@/components/Hero';
import { Section } from '@/components/Section';
import { heroItem, homeSections } from '@/lib/data';

export default function SeriesPage() {
  return (
    <main className="min-h-screen bg-background text-white px-4 md:px-6">
      <TopBar />
      <Hero item={heroItem} />
      <div className="flex flex-col mt-6 space-y-4">
        {homeSections.map(section => (
          <Section key={section.id} section={section} />
        ))}
      </div>
    </main>
  );
}
