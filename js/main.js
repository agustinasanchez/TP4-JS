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

fetch(`https://api.themoviedb.org/3/movie/popular?api_key=de8e683780427ec48ccb17461ebf36c3`)
  .then(response => response.json())
  .then( res => res.results.forEach(e => console.log(e)))

fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=de8e683780427ec48ccb17461ebf36c3`)
  .then(response => response.json())
  .then( res => res.results.forEach(e => console.log(e)))

fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=de8e683780427ec48ccb17461ebf36c3`)
  .then(response => response.json())
  .then( res => res.results.forEach(e => console.log(e)))

fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=de8e683780427ec48ccb17461ebf36c3`)
  .then(response => response.json())
  .then( res => res.results.forEach(e => console.log(e)))

// Creo en el DOM la lista

const categoryMovie = (id) => {
  let container = document.getElementById(id)

  createElem('ul', 'movies-list', container)
  createElem('li', 'movie', ul)

  let a = document.createElement('a')
  a.href('#')
  // a.onclick(openModal())
  li.appendChild(a)

  createElem('div', 'movie-img', a)
  createElem('img', 'img', div)
  createElem('h3', 'movie-title', a)
}

const createElem = (elem, className, container) => {
  let name = document.createElement(elem)
  name.classList.add(className)
  container.appendChild(name)
}

categoryMovie('popular')
categoryMovie('top-rates')
categoryMovie('upcoming')
categoryMovie('now-playing')



