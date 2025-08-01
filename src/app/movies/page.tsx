
"use client";

import { useEffect, useState } from 'react';
import { TopNavbar } from '@/components/common/navbar/top-navbar';
import { Hero } from '@/components/common/hero';
import { CarouselWrapper } from '@/components/common/carousel/carousel-wrapper';
import { heroItem, type HomeSection, type CarouselItem } from '@/lib/data';
import { Main } from '@/components/common/main';
import { CarouselSection } from '@/components/common/carousel/carousel-section';
import { XtreamClient } from '@/services/xtream';
import type { XtreamCredentials, XtreamVodCategory } from '@/types';

export default function MoviesPage() {
  const [sections, setSections] = useState<HomeSection[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const storedCredentials = localStorage.getItem('xtream_credentials');
      if (storedCredentials) {
        try {
          const credentials = JSON.parse(storedCredentials) as XtreamCredentials;
          const client = new XtreamClient(credentials);
          const categories = await client.getVodCategoriesWithContent();
          
          const movieSections = categories.map((category: XtreamVodCategory): HomeSection => ({
            id: category.category_id,
            title: category.category_name,
            seeAllRoute: `/movies/list?category=${category.category_id}`,
            items: category.items?.map(item => ({
              id: item.stream_id,
              posterPath: item.stream_icon,
              title: item.name,
              videoUrl: '#', // Placeholder
              minutes: 0,   // Placeholder, as API doesn't provide it here
            })) || [],
          }));

          setSections(movieSections);
        } catch (error) {
          console.error("Failed to fetch or parse movie data", error);
        }
      }
    };

    fetchMovies();
  }, []);

  return (
    <Main>
      <TopNavbar searchLink="/movies/list" />
      <Hero item={heroItem} />
      <CarouselSection>
        {sections.map(section => (
          <CarouselWrapper key={section.id} section={section} />
        ))}
      </CarouselSection>
    </Main>
  );
}
