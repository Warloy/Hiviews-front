import { TReview } from '@/types/Post.Type'

const reviewsData: TReview[] = [
  {
    id: 1,
    authorid: 1,
    author: 'Simón Bolívar',
    description: 'La mejor película del mundo. Es literalmente un tiburón tornado, como dice el título.',
    movie: 'Sharknado (2013)',
    image: require('../assets/example/movie06.jpg'),
    date: new Date().toISOString(),
    rate: 5,
    likes: 33,
    comments: 2,
    tags: [
      {
        id: 1,
        name: 'Tiburones'
      },
      {
        id: 2,
        name: 'Acción'
      },
      {
        id: 3,
        name: 'Ciencia Ficción'
      },
    ]
  },
  {
    id: 2,
    authorid: 2,
    author: 'Manuel',
    description: 'Es cine. Scorsese celebra que por primera vez se reúne tanto talento en un mismo lugar, y no es a practicar lavandería.',
    movie: 'Inglorious Basterds (2009)',
    image: require('../assets/example/movie07.jpg'),
    date: new Date().toISOString(),
    rate: 5,
    likes: 99,
    comments: 1,
    tags: [
      {
        id: 4,
        name: 'Inglorious'
      },
      {
        id: 2,
        name: 'Acción'
      }
    ]
  },
  {
    id: 3,
    authorid: 3,
    author: 'Luis Álvarez',
    description: 'Esta sí es la mejor película de todos los tiempos. Simón [ comment removed by the mod team ].',
    movie: 'Shrek 2 (2004)',
    image: require('../assets/example/movie08.jpg'),
    date: new Date().toISOString(),
    rate: 5,
    likes: 999,
    comments: 15,
    tags: [
      {
        id: 5,
        name: 'Comedia'
      },
      {
        id: 6,
        name: 'Infantil'
      },
      {
        id: 2,
        name: 'Acción'
      },
      {
        id: 7,
        name: 'Aventura'
      },
      {
        id: 10,
        name: 'Competencia'
      },
    ]
  },
  {
    id: 4,
    authorid: 4,
    author: 'Jesús Manzano',
    description: 'Es un perfecto ejemplo del adulto que todo niño quiere ser. Spoilers (no de la película): Llegando a adulto te das cuenta de que no quieres que tu vida tenga las mismas decisiones que las de un papel de Adam Sandler. Por lo menos es cómica.',
    movie: 'Grown Ups (2010)',
    image: require('../assets/example/movie09.jpg'),
    date: new Date('2023-06-30T14:36:15.684Z').toISOString(),
    rate: 3,
    likes: 10,
    comments: 35,
    tags: [
      {
        id: 5,
        name: 'Comedia'
      },
    ]
  },
  {
    id: 5,
    authorid: 5,
    author: 'Carlos Forlan',
    description: 'La vi con mis padres y les gustó. Yo me quedé dormido como con un tercio de las películas de Ghibli.',
    movie: 'Princess Mononoke (1997)',
    image: require('../assets/example/movie10.jpg'),
    date: new Date().toISOString(),
    rate: 5,
    likes: 1,
    comments: 99,
    tags: [
      {
        id: 8,
        name: 'Anime'
      },
      {
        id: 9,
        name: 'Familiar'
      },
    ]
  },
  {
    id: 6,
    authorid: 10,
    author: 'Wilder',
    description: 'no la he visto, pero dicen que es madre pelicula',
    movie: 'Death Stranding',
    image: require('../assets/example/movie11.jpg'),
    date: new Date('2023-05-30T14:36:15.684Z').toISOString(),
    rate: 1,
    likes: 0,
    comments: 0,
    tags: [
      {
        id: 11,
        name: 'Videojuegos'
      },
      {
        id: 12,
        name: 'Kojimamadas'
      },
      {
        id: 13,
        name: 'No tiene nada que ver con cine'
      },
    ]
  }
];

export default reviewsData;