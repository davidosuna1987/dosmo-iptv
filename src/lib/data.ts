export interface CarouselItem {
  id: number;
  posterPath: string;
  title: string;
  videoUrl: string;
  minutes: number;
}

export interface HomeSection {
  id: string;
  title: string;
  seeAllRoute: string;
  items: CarouselItem[];
}

export const heroItem: CarouselItem = {
  id: 100,
  posterPath: '280x420',
  title: 'Pelicula de Acción Épica',
  videoUrl: '#',
  minutes: 148,
};

const commonItems: Omit<CarouselItem, 'id' | 'title'>[] = [
  { posterPath: '200x300', videoUrl: '#', minutes: 120 },
  { posterPath: '200x300', videoUrl: '#', minutes: 95 },
  { posterPath: '200x300', videoUrl: '#', minutes: 105 },
  { posterPath: '200x300', videoUrl: '#', minutes: 135 },
  { posterPath: '200x300', videoUrl: '#', minutes: 150 },
  { posterPath: '200x300', videoUrl: '#', minutes: 88 },
];

export const homeSections: HomeSection[] = [
  {
    id: 'recently-added',
    title: 'Añadidos Recientemente',
    seeAllRoute: '/recently-added',
    items: [
      { ...commonItems[0], id: 1, title: 'Aventura en la Jungla' },
      { ...commonItems[1], id: 2, title: 'Misterio en la Ciudad' },
      { ...commonItems[2], id: 3, 'title': 'Comedia Romántica' },
      { ...commonItems[3], id: 4, title: 'Ciencia Ficción: Futuro' },
      { ...commonItems[4], id: 5, title: 'Drama Histórico' },
      { ...commonItems[5], id: 6, title: 'Terror en la Noche' },
    ],
  },
  {
    id: 'trending',
    title: 'Tendencias',
    seeAllRoute: '/trending',
    items: [
      { ...commonItems[0], id: 7, title: 'Superhéroes Unidos' },
      { ...commonItems[1], id: 8, title: 'El Gran Escape' },
      { ...commonItems[2], id: 9, title: 'La Receta Perfecta' },
      { ...commonItems[3], id: 10, title: 'Viaje a las Estrellas' },
      { ...commonItems[4], id: 11, title: 'El Secreto del Océano' },
      { ...commonItems[5], id: 12, title: 'Leyendas del Deporte' },
    ],
  },
];
