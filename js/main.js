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

// const openMovieModal = () => {

// }

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
    img.src = `https://image.tmdb.org/t/p/w370_and_h556_bestv2${poster_path}`
    h3.innerText = title

    container.appendChild(li)
    li.appendChild(a)
    a.appendChild(div)
    div.appendChild(img)
    a.appendChild(h3)
}

const fillModal = ({title, tagline, poster_path, backdrop_path, overview, release_date, genres}) => {
    fillElem('movie-title', title)
    fillElem('overview', overview)
    fillElem('sub-title', tagline)
    fillElem('release-date', release_date)
    document.getElementById('header-img').src = `https://image.tmdb.org/t/p/w370_and_h556_bestv2${backdrop_path}`
    document.getElementById('movie-image').src = `https://image.tmdb.org/t/p/w370_and_h556_bestv2${poster_path}`
    console.log(genres)
    genres.forEach( e => {
        let genre = document.createElement('span')
        genre.innerHTML = e.name
        //completar esto
    })
}

const fillElem = (idElem, content) => {
    let elem = document.getElementById(idElem)
    elem.innerText = content
}

const fetchMovie = (peliculaId) => fetch(`https://api.themoviedb.org/3/movie/${peliculaId}?api_key=${apiKey}`)
    .then(response => response.json())
    .then(res => fillModal(res))
    .catch(error => console.log(error))

const createAllElemPage = (title, results) => {
    let home = document.getElementById('home')
    home.innerHTML = ' '
    let div = createElem('div', 'container') //la clase no tiene estilos
    let ul = createElem('ul', 'movies-list')
    ul.id = 'list-container'
    let h2 = createElem('h2', 'title-category')
    h2.innerText = title
    h2.id = 'title'
    let totalResults = createElem('p', 'total-results') //la clase no tiene estilos
    totalResults.innerText = results // no se como traer esta info
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
//falta mejorar los estilos de la pagina


let currentCategory 

const listAllMovies = (title, category) => {
    allMovies(title, category, page = 1)
}

const allMovies = (titlePage, category, page) => {
    fetch(`https://api.themoviedb.org/3/movie/${category}?api_key=${apiKey}&page=${page}`)
        .then(response => response.json())
        .then(res => {
<<<<<<< HEAD
        createAllElemPage(titlePage, res.total_results)
=======
        createAllElemPage(titlePage)
        currentCategory = category
>>>>>>> ec8b168d99cf2a99e92d86acc3b894a0f5de6499
        res.results.forEach(e => {
            createList(e, 'list-container')
        })}
        )
        .catch(error => console.log(error))
}

const addOnePageMore = () => {
    page = page + 1
    let title = document.getElementById('title').innerText
    allMovies(title, currentCategory, page) // pasar la categoria correcta como parametro
}

const initialize = () => {
    categories.forEach(e => printList(e))
    fetchMovie('299534')
}

const infoMovie = (content) => {
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${content}&page=${page}`)
        .then(response => response.json())
        .then(res => {
            let home = document.getElementById('home')
            home.innerHTML = ' '
            let container = document.createElement('div')
            container.id = 'container'
            home.appendChild(container)
            res.results.forEach(e => createList(e, 'container')
            )
        })
}

const searchMovie = () => {
    let input = document.getElementById('search')
    content = input.value
    if (content !== ''){
        input.value = ''
        infoMovie(content)
    }
}

var keyPress=function(event){
    event.code === 'Enter' ? searchMovie() : false
}

/*
*Los resultados totales
*generos en el modal
*Modal para cada peli
*Busqueda en la pagina principal

*boton para siguiente y anterior o que cuando apretes loadmore se carguen abajo
*Los estilos en la pagina de cada categoria
*responsive - sacar el nav y hacer el menu hamburguesa
*si llegamos hacer el autocomplete en la busqueda
*/