// Modal

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

// Api
// POPULAR

let apiKey = `de8e683780427ec48ccb17461ebf36c3`
let categories = ['popular', 'top_rated', 'upcoming', 'now_playing']

const createElem = (elem, className) => {
  let name = document.createElement(elem)
  name.classList.add(className)
  return name
}

const printList = (category) => fetch(`https://api.themoviedb.org/3/movie/${category}?api_key=${apiKey}`)
    .then(response => response.json())
    .then(res => {
      for(i=0; i<5;i++){
        createList(res.results[i], category)
      }
  })

const createList = ({title, id, poster_path}, idContainer) => {
  let container = document.getElementById(idContainer)

  let li = createElem('li', 'movie')
  li.id = id
  container.appendChild(li)
  let a = createElem('a', 'link')
  a.href = '#'
  a.addEventListener('click', openModal, true)
  li.appendChild(a)
  let div = createElem('div', 'movie-img')
  a.appendChild(div)
  let img = createElem('img', 'img')
  img.value = poster_path
  div.appendChild(img)
  let h3 = createElem('h3', 'movie-title')
  h3.innerText = title
  a.appendChild(h3)
}

const fillModal = ({title, tagline, poster_path, backdrop_path, overview, release_date}) => {
  fillElem('movie-title', title)
  fillElem('overview', overview)
  fillElem('sub-title', tagline)
  fillElem('header-img', backdrop_path)
  fillElem('movie-image', poster_path)
  fillElem('release-date', release_date)
  // genres.forEach( e => {
  //   fillElem('genres', `${e.name}, `)
  // })
}

const fillElem = (idElem, content) => {
  let elem = document.getElementById(idElem)
  elem.innerText = content
}

const fetchMovie = (peliculaId) => fetch(`https://api.themoviedb.org/3/movie/${peliculaId}?api_key=${apiKey}`)
  .then(response => response.json())
  .then(res => fillModal(res))

const createAllElemPage = (title) => {
  let home = document.getElementById('home')
  home.innerHTML = ' '
  let div = createElem('div', 'container') //la clase no tiene estilos
  let ul = createElem('ul', 'movies-list')
  ul.id = 'list-container'
  let h2 = createElem('h2', 'title-category')
  h2.innerText = title
  let totalResults = createElem('p', 'total-results') //la clase no tiene estilos
  totalResults.innerText = '56463' // no se como traer esta info
  let loadMoreButton = createElem('a', 'load-more') //la clase no tiene estilos
  loadMoreButton.innerText = 'Load More'
  loadMoreButton.href = '#'
  // loadMoreButton.onclick = addOnePageMore // aca es el onclick del boton de loadmore
  home.appendChild(div)
  div.appendChild(h2) 
  div.appendChild(totalResults)
  div.appendChild(loadMoreButton)
  div.appendChild(ul)
}
//falta mejorar los estilos de la pagina y filtrar por categoria

//aca no se como hacer para que cuando aprete el boton de loadmore le sume uno a la page
// const addOnePageMore = () => {
//   let newPage = page + 1
//   allMovies(newPage)
// }

let titlePage = 'Popular Movies'
let page = 1
let category = 'popular'

const allMovies = () => {
  fetch(`https://api.themoviedb.org/3/movie/${category}?api_key=${apiKey}&page=${page}`)
    .then(response => response.json())
    .then(res => {
      createAllElemPage(titlePage)
      res.results.forEach(e => {
        createList(e, 'list-container')
    })}
    )
}

const initialize = () => {
  categories.forEach(e => printList(e))
  fetchMovie('420818')
}


/*
*Los onclicks en las categorias del nav
*Los nombres de las paginas donde muestran todo
*Los estilos en la pagina de cada categoria
*Las imagenes
*Modal para cada peli
*Buscador para peliculas
*/
