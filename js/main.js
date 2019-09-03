const closeModal = () => {
    let container = document.getElementById('modal')
    container.classList.remove('modal-container')
    container.classList.add('close-modal')
}

const openMenu = () => {
    document.getElementById('menu').onclick = closeMenu
    document.getElementById('menu-on').style.display = 'block'
}

const closeMenu = () => {
    document.getElementById('menu-on').style.display = 'none'
    document.getElementById('menu').onclick = openMenu
}

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
    a.onclick = () => {
        let container = document.getElementById('modal')
        fetchMovie(id)
        container.classList.remove('close-modal')
        container.classList.add('modal-container')
    }
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
    let ul = document.getElementById('genres')
    ul.innerHTML = ''
    genres.forEach( e => {
        let genre = document.createElement('li')
        genre.innerText = ` ${e.name}`
        genre.classList.add('genre')
        ul.appendChild(genre)
    })
}

const fillElem = (idElem, content) => {
    let elem = document.getElementById(idElem)
    elem.innerHTML = ''
    elem.innerText = content
}

const fetchMovie = (peliculaId) => fetch(`https://api.themoviedb.org/3/movie/${peliculaId}?api_key=${apiKey}`)
    .then(response => response.json())
    .then(res => fillModal(res))
    .catch(error => console.log(error))

const createAllElemPage = (title, page, totalPages, results) => {
    let home = document.getElementById('home')
    home.innerHTML = ' '
    let div = createElem('div', 'container-list') 
    let ul = createElem('ul', 'all-movies-list') 
    ul.id = 'list-container'

    let contTitle = document.createElement('div')
    contTitle.classList.add('container-title')

    let h2 = createElem('h2', 'title')
    h2.innerText = title
    h2.id = 'title'
    let totalResults = createElem('p', 'results') 
    totalResults.innerText = `${results} results`

    let numPage = createElem('p', 'p-results')
    numPage.innerText = `Page ${page} of ${totalPages}`

    let contBtn = document.createElement('div')
    contBtn.classList.add('container-btn')

    let previousBtn = createBtn('← Previous', 'button', 'previous', previousPage)
    page === 1 ? previousBtn.style.display = 'none' : true
    let nextBtn = createBtn('Next →', 'button', 'next', nextPage)
    page === totalPages ? nextBtn.style.display = 'none' : true

    home.appendChild(div)
    div.appendChild(contTitle)
    contTitle.appendChild(h2) 
    contTitle.appendChild(totalResults)
    div.appendChild(contBtn)
    contBtn.appendChild(previousBtn)
    contBtn.appendChild(nextBtn)
    div.appendChild(numPage)
    div.appendChild(ul)
}

const createBtn = (content, classBtn, id, functionBtn) => {
    let btn = createElem('a', 'button-page')
    btn.innerText = content
    btn.classList.add(classBtn)
    btn.id = id
    btn.onclick = functionBtn
    btn.href = '#'
    return btn
}
let page = 1
let currentCategory 

const listAllMovies = (title, category) => {
    allMovies(title, category, page = 1)
}

const allMovies = (titlePage, category, page) => {
    fetch(`https://api.themoviedb.org/3/movie/${category}?api_key=${apiKey}&page=${page}`)
        .then(response => response.json())
        .then(res => {
        createAllElemPage(titlePage, res.page, res.total_pages, res.total_results)
        currentCategory = category
        res.results.forEach(e => {
            createList(e, 'list-container')
        })}
        )
        .catch(error => console.log(error))
}

const infoMovie = (content, page) => {
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${content}&page=${page}`)
        .then(response => response.json())
        .then(res => {
            createAllElemPage('Search Results', res.page, res.total_pages, res.total_results)
            res.results.forEach(e => {
                createList(e, 'list-container')
            })
        })
        .catch(error => console.log(error))
}

let currentContent 

const searchMovie = () => {
    let input = document.getElementById('search')
    currentContent = input.value
    page = 1
    if (currentContent !== ''){
        input.value = ''
        infoMovie(currentContent)
    }
}

const nextPage = () => {
    page = page + 1
    let title = document.getElementById('title').innerText
    title === 'Search Results' ? infoMovie(currentContent, page) : allMovies(title, currentCategory, page) 
}
const previousPage = () => {
    page = page - 1
    let title = document.getElementById('title').innerText
    title === 'Search Results' ? infoMovie(currentContent, page) : allMovies(title, currentCategory, page) 
}

var keyPress=function(event){
    event.code === 'Enter' ? searchMovie() : false
}

const initialize = () => {
    categories.forEach(e => printList(e))
}