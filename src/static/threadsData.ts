import { TThread } from "@/types/Post.Type"

const threads: TThread[] = [
  {
    id: 1,
    authorID: 1,
    author: "Simón Bolívar",
    description: "No puede ser que a la mejor película del mundo le estén bajando puntos porque existe Shrek 2.",
    category: {
      id: 1,
      name: "Discusión"
    },
    topic: "Es injusto para Sharknado",
    picture: require("../assets/example/movie06.jpg"),
    date: new Date('2023-05-30T14:36:15.684Z').toISOString(),
    likes: 33,
    comments: 2
  },
  {
    id: 2,
    authorID: 2,
    author: "Manuel",
    description: "no la he visto, pero dicen que es madre pelicula. Lorem ipsum dolor sit amet quinnLorem ipsum dolor sit amet quinnLorem ipsum dolor sit amet quinnLorem ipsum dolor sit amet quinnLorem ipsum dolor sLorem ipsum dolor sit amet quinnLorem ipsum dolor sit amet quinnLorem ipsum dolor sit amet quinnLorem ipsum dolor sit amet quinnLorem ipsum dolor sit amet quinnit amet quinnLorem ipsum dolor sit amet quinnLorem ipsum dolor sit amet quinnLorem ipsum dolor sit amet quinnLorem ipsum dolor sit amet quinnLorem ipsum dolor sLorem ipsum dolor sit amet quinnLorem ipsum dolor sit amet quinnLorem ipsum dolor sit amet quinnLorem ipsum dolor sit amet quinnLorem ipsum dolor sit amet quinnit amet quinn",
    category: {
      id: 2,
      name: "Cinéfilo"
    },
    topic: "Pero es que los planos",
    picture: require("../assets/example/movie07.jpg"),
    date: new Date().toISOString(),
    likes: 99,
    comments: 1
  },
  {
    id: 3,
    authorID: 3,
    author: "Anon",
    description: "No tiene comparativa. No hay discusión. En serio, no puedes llamarte un ser pensante y no estar de acuerdo con esto. Si piensas de esa manera, considera verte con un psicólogo o algo por el estilo. En serio.",
    category: {
      id: 3,
      name: "Offtopic"
    },
    topic: "Definitivamente la mejor imagen de perfil de la app es esta.",
    picture: require("../assets/example/avatar06.jpg"),
    date: new Date('2023-05-30T14:36:15.684Z').toISOString(),
    likes: 99,
    comments: 1
  },
  {
    id: 4,
    authorID: 10,
    author: "Luis",
    description: "[ This thread has been closed by the mod team ].",
    category: {
      id: 1,
      name: "Discusión"
    },
    topic: "[ Title removed by the mod team ]",
    picture: null,
    date: new Date('2023-05-30T14:36:15.684Z').toISOString(),
    likes: 99,
    comments: 1
  },
]

export default threads