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
let idCategories = ['popular', 'top-rated', 'upcoming', 'now-playing']


const createElem = (elem, className) => {
  let name = document.createElement(elem)
  name.classList.add(className)
  return name
}

const fetchFunction = (category, idCategory) => fetch(`https://api.themoviedb.org/3/movie/${category}?api_key=${apiKey}`)
    .then(response => response.json())
    .then(res => {
      createList(res.results[0], idCategory)
      createList(res.results[1], idCategory)
      createList(res.results[2], idCategory)
      createList(res.results[3], idCategory)
  })

fetchFunction(categories[0],idCategories[0])
fetchFunction(categories[1],idCategories[1])
fetchFunction(categories[2],idCategories[2])
fetchFunction(categories[3],idCategories[3])

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

const fetchMovie = (peliculaId, apiKey) => fetch(`https://api.themoviedb.org/3/movie/${peliculaId}?api_key=${apiKey}`)
  .then(response => response.json())
  .then(res => fillModal(res))

fetchMovie('420818', apiKey)

const popularPage = ({results}) => {
  let home = document.getElementsById('home')
  home. innerHTML = ' '
  createList(results[0], 'home')
}

const fetchPage = (apiKey, page) => {
  fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=${page}`)
    .then(response => response.json())
    .then(res => popularPage(res))
}

fetchPage(apiKey, 1)

