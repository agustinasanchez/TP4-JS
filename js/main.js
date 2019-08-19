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



