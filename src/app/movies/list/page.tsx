"use client"

import { TopNavbar } from '@/components/common/navbar/top-navbar';
import { Main } from '@/components/common/main';
import { List } from '@/components/common/list/list';
import { heroItem } from '@/lib/data';
import { useState } from 'react';
import { NotFound } from '@/components/common/not-found';

export default function MoviesListPage() {
  const [searchInputValue, setSearchInputValue] = useState('')

  const items = Array.from({ length: 50 }).map((_, index) => ({
    ...heroItem,
    id: index,
    title: `Movie ${index}`,
  }))

  const filteredItems = items.filter(item => item.title.toLowerCase().includes(searchInputValue.toLowerCase()))

  return (
    <Main>
      <TopNavbar onInputChanged={setSearchInputValue}/>
      { filteredItems.length ? <List items={filteredItems} /> : <NotFound /> }
    </Main>
  );
}
