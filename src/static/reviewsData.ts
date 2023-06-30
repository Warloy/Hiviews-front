import { TReview } from '../types'

const reviews: TReview[] = [
  {
    id: 1,
    author: 'Simón Bolívar',
    description: 'La mejor película del mundo. Es literalmente un tiburón tornado, como dice el título.',
    movie: 'Sharknado (2013)',
    image: require('../assets/example/movie06.jpg'),
    date: new Date(),
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
    author: 'Manuel',
    description: 'Es cine. Scorsese celebra que por primera vez se reúne tanto talento en un mismo lugar, y no es a practicar lavandería.',
    movie: 'Inglorious Basterds (2009)',
    image: require('../assets/example/movie07.jpg'),
    date: new Date(),
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
    author: 'Luis Álvarez',
    description: 'Esta sí es la mejor película de todos los tiempso. Simón [ comment removed by the mod team ].',
    movie: 'Shrek 2 (2004)',
    image: require('../assets/example/movie08.jpg'),
    date: new Date(),
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
    author: 'Jesús Manzano',
    description: 'Es un perfecto ejemplo del adulto que todo niño quiere ser. Spoilers (no de la película): Llegando a adulto te das cuenta de que no quieres que tu vida tenga las mismas decisiones que las de un papel de Adam Sandler. Por lo menos es cómica.',
    movie: 'Grown Ups (2010)',
    image: require('../assets/example/movie09.jpg'),
    date: new Date(),
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
    author: 'Carlos Forlan',
    description: 'La vi con mis padres y les gustó. Yo me quedé dormido como con un tercio de las películas de Ghibli.',
    movie: 'Princess Mononoke (1997)',
    image: require('../assets/example/movie10.jpg'),
    date: new Date(),
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
  }
]

export default reviews