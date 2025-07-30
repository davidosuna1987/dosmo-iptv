import { CarouselItem } from "@/lib/data";
import { ListItem } from "./list-item";

interface ListProps {
  title?: string;
  items: CarouselItem[];
}

export function List({ title, items }: ListProps) {
    return (
    <section className="max-w-[1500px] mx-auto pt-16">
      { title && 
        <h2 className="text-2xl font-semibold mb-4">{ title }</h2>
      }
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 md:gap-6 lg:gap-8">
        { items.map(item => (
          <ListItem key={item.id} item={item} />
        )) }
      </div>
    </section>
  );
}
