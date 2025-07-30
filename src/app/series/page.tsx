import { SearchBar } from '@/components/common/navbar/search-bar';
import { Hero } from '@/components/common/hero';
import { CarouselWrapper } from '@/components/common/carousel/carousel-wrapper';
import { heroItem, homeSections } from '@/lib/data';
import { Main } from '@/components/common/main';
import { CarouselSection } from '@/components/common/carousel/carousel-section';

export default function SeriesPage() {
  return (
    <Main>
      <SearchBar />
      <Hero item={heroItem} />
      <CarouselSection>
        {homeSections.map(section => (
          <CarouselWrapper key={section.id} section={section} />
        ))}
      </CarouselSection>
    </Main>
  );
}
