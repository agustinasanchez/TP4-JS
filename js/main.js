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
    .catch(error => console.log(error))

const createList = ({title, id, poster_path}, idContainer) => {
    let container = document.getElementById(idContainer)

    let li = createElem('li', 'movie')
    let a = createElem('a', 'link')
    let div = createElem('div', 'movie-img')
    let img = createElem('img', 'img')
    let h3 = createElem('h3', 'movie-title')

    li.id = id
    a.addEventListener('click', openModal, true)
    a.href = '#'
    img.value = poster_path
    h3.innerText = title

    container.appendChild(li)
    li.appendChild(a)
    a.appendChild(div)
    div.appendChild(img)
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
    .catch(error => console.log(error))

const createAllElemPage = (title) => {
    let home = document.getElementById('home')
    home.innerHTML = ' '

    let div = createElem('div', 'container') //la clase no tiene estilos
    let ul = createElem('ul', 'movies-list')
    ul.id = 'list-container'
    let h2 = createElem('h2', 'title-category')
    h2.innerText = title
    h2.id = 'title'
    let totalResults = createElem('p', 'total-results') //la clase no tiene estilos
    totalResults.innerText = '56463' // no se como traer esta info
    let loadMoreButton = createElem('a', 'load-more') //la clase no tiene estilos
    loadMoreButton.innerText = 'Load More'
    loadMoreButton.href = '#'
    loadMoreButton.onclick = addOnePageMore
    home.appendChild(div)
    div.appendChild(h2) 
    div.appendChild(totalResults)
    div.appendChild(loadMoreButton)
    div.appendChild(ul)
}
//falta mejorar los estilos de la pagina y filtrar por categoria

let page = 1

const addOnePageMore = () => {
  page = page + 1
  let title = document.getElementById('title').innerText
  allMovies(title, 'popular') // pasar la categoria correcta como parametro
}

const allMovies = (titlePage, category) => {
    fetch(`https://api.themoviedb.org/3/movie/${category}?api_key=${apiKey}&page=${page}`)
        .then(response => response.json())
        .then(res => {
        createAllElemPage(titlePage)
        res.results.forEach(e => {
            createList(e, 'list-container')
        })}
        )
        .catch(error => console.log(error))
}

const initialize = () => {
    categories.forEach(e => printList(e))
    fetchMovie('420818')
}

/*
*Los resultados totales
*El boton de loadmore
*Los estilos en la pagina de cada categoria
*Las imagenes no aparecen
*Modal para cada peli
*Buscador para peliculas
*responsive - sacar el nav y hacer el menu hamburguesa
*/
