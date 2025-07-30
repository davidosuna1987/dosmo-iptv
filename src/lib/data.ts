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

export interface LiveShowItem {
  id: number;
  posterPath: string;
  title: string;
}

export interface LiveSection {
  id: string;
  title: string;
  seeAllRoute: string;
  items: LiveShowItem[];
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
  { posterPath: '200x300', videoUrl: '#', minutes: 110 },
  { posterPath: '200x300', videoUrl: '#', minutes: 125 },
  { posterPath: '200x300', videoUrl: '#', minutes: 90 },
  { posterPath: '200x300', videoUrl: '#', minutes: 100 },
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
      { ...commonItems[6], id: 7, title: 'Aventura en la Jungla' },
      { ...commonItems[7], id: 8, title: 'Misterio en la Ciudad' },
      { ...commonItems[8], id: 9, 'title': 'Comedia Romántica' },
      { ...commonItems[9], id: 10, title: 'Ciencia Ficción: Futuro' },
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
      { ...commonItems[6], id: 13, title: 'Superhéroes Unidos' },
      { ...commonItems[7], id: 14, title: 'El Gran Escape' },
      { ...commonItems[8], id: 15, title: 'La Receta Perfecta' },
      { ...commonItems[9], id: 16, title: 'Viaje a las Estrellas' },
    ],
  },
  {
    id: 'recently-added-2',
    title: 'Añadidos Recientemente',
    seeAllRoute: '/recently-added',
    items: [
      { ...commonItems[0], id: 1, title: 'Aventura en la Jungla' },
      { ...commonItems[1], id: 2, title: 'Misterio en la Ciudad' },
      { ...commonItems[2], id: 3, 'title': 'Comedia Romántica' },
      { ...commonItems[3], id: 4, title: 'Ciencia Ficción: Futuro' },
      { ...commonItems[4], id: 5, title: 'Drama Histórico' },
      { ...commonItems[5], id: 6, title: 'Terror en la Noche' },
      { ...commonItems[6], id: 7, title: 'Aventura en la Jungla' },
      { ...commonItems[7], id: 8, title: 'Misterio en la Ciudad' },
      { ...commonItems[8], id: 9, 'title': 'Comedia Romántica' },
      { ...commonItems[9], id: 10, title: 'Ciencia Ficción: Futuro' },
    ],
  },
  {
    id: 'trending-2',
    title: 'Tendencias',
    seeAllRoute: '/trending',
    items: [
      { ...commonItems[0], id: 7, title: 'Superhéroes Unidos' },
      { ...commonItems[1], id: 8, title: 'El Gran Escape' },
      { ...commonItems[2], id: 9, title: 'La Receta Perfecta' },
      { ...commonItems[3], id: 10, title: 'Viaje a las Estrellas' },
      { ...commonItems[4], id: 11, title: 'El Secreto del Océano' },
      { ...commonItems[5], id: 12, title: 'Leyendas del Deporte' },
      { ...commonItems[6], id: 13, title: 'Superhéroes Unidos' },
      { ...commonItems[7], id: 14, title: 'El Gran Escape' },
      { ...commonItems[8], id: 15, title: 'La Receta Perfecta' },
      { ...commonItems[9], id: 16, title: 'Viaje a las Estrellas' },
    ],
  },
];


const commonLiveItems: Omit<LiveShowItem, 'id' | 'title'>[] = [
  { posterPath: '120x80' },
  { posterPath: '120x80' },
  { posterPath: '120x80' },
  { posterPath: '120x80' },
  { posterPath: '120x80' },
  { posterPath: '120x80' },
];

export const liveSections: LiveSection[] = [
  {
    id: 'masmedia-gold',
    title: 'ES | MASMEDIA GOLD',
    seeAllRoute: '/live/masmedia-gold',
    items: [
      { ...commonLiveItems[0], id: 201, title: 'M+: La 1 RAW' },
      { ...commonLiveItems[1], id: 202, title: 'M+: La 2 RAW' },
      { ...commonLiveItems[2], id: 203, title: 'M+: La 3 RAW' },
      { ...commonLiveItems[3], id: 204, title: 'M+: La 4 RAW' },
      { ...commonLiveItems[4], id: 205, title: 'M+: La 5 RAW' },
      { ...commonLiveItems[5], id: 206, title: 'M+: La 6 RAW' },
    ],
  },
  {
    id: 'tivify-hd',
    title: 'ES | TIVIFY HD',
    seeAllRoute: '/live/tivify-hd',
    items: [
      { ...commonLiveItems[0], id: 207, title: 'ES: LA 2 HD' },
      { ...commonLiveItems[1], id: 208, title: 'ES: LA SEXTA HD' },
      { ...commonLiveItems[2], id: 209, title: 'ES: ANTENA 3 HD' },
      { ...commonLiveItems[3], id: 210, title: 'ES: TELECINCO HD' },
      { ...commonLiveItems[4], id: 211, title: 'ES: CUATRO HD' },
      { ...commonLiveItems[5], id: 212, title: 'ES: NEOX HD' },
    ],
  },
  {
    id: 'tivify-gold',
    title: 'ES | TIVIFY GOLD',
    seeAllRoute: '/live/tivify-gold',
    items: [
      { ...commonLiveItems[0], id: 213, title: 'TY: CANAL MÁLAGA RAW' },
      { ...commonLiveItems[1], id: 214, title: 'TY: CANAL PARLAMENTO RAW' },
      { ...commonLiveItems[2], id: 215, title: 'TY: CANAL SUR RAW' },
      { ...commonLiveItems[3], id: 216, title: 'TY: CANAL DEPORTES RAW' },
      { ...commonLiveItems[4], id: 217, title: 'TY: CANAL COCINA RAW' },
      { ...commonLiveItems[5], id: 218, title: 'TY: CANAL VIAJAR RAW' },
    ],
  },
];
