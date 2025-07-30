import { SearchBar } from '@/components/common/navbar/search-bar';
import { liveSections } from '@/lib/data';
import { BottomNavBar } from '@/components/common/navbar/bottom-navbar';
import { LiveSection } from '@/components/live-show/live-show-wrapper';
import { Main } from '@/components/common/main';
import { CarouselSection } from '@/components/common/carousel/carousel-section';

export default function LivePage() {
  return (
    <Main>
      <SearchBar />
      <CarouselSection>
          {liveSections.map(section => (
              <LiveSection key={section.id} section={section} />
          ))}
      </CarouselSection>
    </Main>
  );
}
