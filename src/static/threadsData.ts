import { TThread } from '../types'

const reviews: TThread[] = [
  {
    id: 1,
    author: 'Simón Bolívar',
    description: 'No puede ser que a la mejor película del mundo le estén bajando puntos porque existe Shrek 2.',
    category: {
        id: 1,
        name: 'Discusión'
    },
    topic: 'Es injusto para Sharknado',
    picture: require('../assets/example/movie06.jpg'),
    date: new Date(),
    likes: 33,
    comments: 2
  },
  {
    id: 2,
    author: 'Manuel',
    description: 'Los planos son tremendos.',
    category: {
        id: 2,
        name: 'Cinéfilo'
    },
    topic: 'Pero es que los planos',
    picture: require('../assets/example/movie07.jpg'),
    date: new Date(),
    likes: 99,
    comments: 1
  },
  {
    id: 3,
    author: 'Anon',
    description: 'No tiene comparativa. No hay discusión. En serio, no puedes llamarte un ser pensante y no estar de acuerdo con esto. Si piensas de esa manera, considera verte con un psicólogo o algo por el estilo. En serio.',
    category: {
        id: 3,
        name: 'Offtopic'
    },
    topic: 'Definitivamente la mejor imagen de perfil de la app es esta.',
    picture: require('../assets/example/avatar06.jpg'),
    date: new Date(),
    likes: 99,
    comments: 1
  },
  {
    id: 4,
    author: 'Luis',
    description: '[ This thread has been closed by the mod team ].',
    category: {
        id: 1,
        name: 'Discusión'
    },
    topic: '[ Title removed by the mod team ]',
    picture: '',
    date: new Date(),
    likes: 99,
    comments: 1
  },
]

export default reviews