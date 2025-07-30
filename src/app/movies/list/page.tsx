import { TopNavbar } from '@/components/common/navbar/top-navbar';
import { Main } from '@/components/common/main';
import { List } from '@/components/common/list/list';
import { heroItem } from '@/lib/data';

export default function MoviesListPage() {
  const items = Array.from({ length: 50 }).map((_, index) => ({
    ...heroItem,
    id: index,
    title: `Movie ${index}`,
  }))

  return (
    <Main>
      <TopNavbar />
      <List items={items} />
    </Main>
  );
}
