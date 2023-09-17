import { TComment } from "@/types/Post.Type"

const comments: TComment[] = [
  {
    id: 1,
    author: 'Gato Cuántico',
    authAvatar: require('../assets/example/avatar12.jpg'),
    content: 'Muy bueno el post pero que feo el autor.',
    date: new Date()
  },
  {
    id: 2,
    author: 'Hijoe Batman',
    authAvatar: require('../assets/example/avatar02.jpg'),
    content: 'La trilogía de Batman le gana.',
    date: new Date()
  },
  {
    id: 3,
    author: 'Programador Blanco99999',
    authAvatar: require('../assets/example/avatar03.jpg'),
    content: 'No se que vi pero en un punto de la peli se vuelven piedras.',
    date: new Date()
  },
  {
    id: 4,
    author: 'Wilburn',
    authAvatar: require('../assets/example/avatar01.jpg'),
    content: 'Oz noooOoO, porque una peli de iguanas.',
    date: new Date()
  },
  {
    id: 5,
    author: 'Personalidad Wachu',
    authAvatar: require('../assets/example/avatar08.jpg'),
    content: 'Flash no tiene buen cgi.',
    date: new Date()
  },
  {
    id: 6,
    author: 'Wakanda 4ever',
    authAvatar: require('../assets/example/avatar06.jpg'),
    content: 'Honestamente no me gusto, menos mal era pirata.',
    date: new Date()
  },
  {
    id: 7,
    author: 'Gwen Stacy64',
    authAvatar: require('../assets/example/avatar10.jpg'),
    content: 'Spider verse es mejor en ingles, en la otra version dicen mano.',
    date: new Date()
  },
  {
    id: 8,
    author: 'Goku 12',
    authAvatar: require('../assets/example/avatar02.jpg'),
    content: 'Los pinguinos de madagascar son GOD oyo.',
    date: new Date()
  },
  {
    id: 9,
    author: 'Camaron rosa',
    authAvatar: require('../assets/example/avatar11.jpg'),
    content: 'omg lmao.',
    date: new Date()
  },
  {
    id: 10,
    author: 'Batman Original',
    authAvatar: require('../assets/example/avatar02.jpg'),
    content: 'El batman de Pattison es muy edgy wtf, aunque esta chulita.',
    date: new Date()
  },
  {
    id: 11,
    author: 'Simon Bolivar',
    authAvatar: require('../assets/example/avatar09.jpg'),
    content: 'No me gusto no la vean.',
    date: new Date()
  },
  {
    id: 12,
    author: 'Programador Front',
    authAvatar: require('../assets/example/avatar02.jpg'),
    content: 'La pelicula era de hackers y salieron aliens al final ke.',
    date: new Date()
  },
]

export default comments;