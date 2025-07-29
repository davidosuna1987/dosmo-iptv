import { TopBar } from '@/components/TopBar';
import { Hero } from '@/components/Hero';
import { Section } from '@/components/Section';
import { heroItem, homeSections } from '@/lib/data';

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-white px-4 md:px-6">
      <TopBar />
      <Hero item={heroItem} />
      <div className="flex flex-col mt-10 space-y-10">
        {homeSections.map(section => (
          <Section key={section.id} section={section} />
        ))}
      </div>
      <div className="pb-24" />
    </main>
  );
}
