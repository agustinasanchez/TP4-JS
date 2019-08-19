<<<<<<< HEAD
let data = {
  page:1,
  total_results:19783,
  total_pages:990,
  results:[
      {
        vote_count:4394,
        id:299537,
        video:false,
        vote_average:7.1,
        title:"Captain Marvel",
        popularity:433.107,
        poster_path:"\/AtsgWhDnHTq68L0lLsUrCnM7TjG.jpg",
        original_language:"en",
        original_title:"Captain Marvel",
        genre_ids:[
            28,
            12,
            878
        ],
        backdrop_path:"\/w2PMyoyLU22YvrGK3smVM9fW1jj.jpg",
        adult:false,
        overview:"The story follows Carol Danvers as she becomes one of the universe’s most powerful heroes when Earth is caught in the middle of a galactic war between two alien races. Set in the 1990s, Captain Marvel is an all-new adventure from a previously unseen period in the history of the Marvel Cinematic Universe.",
        release_date:"2019-03-06"
      }
  ]
}

let data_movies = {
    adult:false,
    backdrop_path:"/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg",
    belongs_to_collection:{
        id:86311,
        name:"The Avengers Collection",
        poster_path:"/qJawKUQcIBha507UahUlX0keOT7.jpg",
        backdrop_path:"/zuW6fOiusv4X9nnW3paHGfXcSll.jpg"
    },
    budget:500000000,
    genres:[
        {
          id:12,
          name:"Adventure"
        },
        {
          id:878,
          name:"Science Fiction"
        },
        {
          id:28,
          name:"Action"
        }
    ],
    homepage:"https://www.marvel.com/movies/avengers-endgame",
    id:299534,
    imdb_id:"tt4154796",
    original_language:"en",
    original_title:"Avengers: Endgame",
    overview:"After the devastating events of Avengers: Infinity War, the universe is in ruins due to the efforts of the Mad Titan, Thanos. With the help of remaining allies, the Avengers must assemble once more in order to undo Thanos' actions and restore order to the universe once and for all, no matter what consequences may be in store.",
    popularity:336.684,
    poster_path:"/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
    production_companies:[
        {
          id:420,
          logo_path:"/hUzeosd33nzE5MCNsZxCGEKTXaQ.png",
          name:"Marvel Studios",
          origin_country:"US"
        }
    ],
    production_countries:[
        {
          iso_3166_1:"US",
          name:"United States of America"
        }
    ],
    release_date:"2019-04-24",
    revenue:1223641414,
    runtime:181,
    spoken_languages:[
        {
          iso_639_1:"en",
          name:"English"
        }
    ],
    status:"Released",
    tagline:"Part of the journey is the end.",
    title:"Avengers: Endgame",
    video:false,
    vote_average:8.7,
    vote_count:2912
  }
=======
const openModal = () => {
    let container = document.getElementById('modal')
    container.classList.remove('close-modal')
    container.classList.add('modal-container')
}

const closeModal = () => {
    let container = document.getElementById('modal')
    container.classList.remove('modal-container')
    container.classList.add('close-modal')
}

>>>>>>> e7a82d3a8fe4c26d490971f76a9c0136e67c04bb
