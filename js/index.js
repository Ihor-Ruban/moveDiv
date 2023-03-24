// Отримання посилання на елемент обгортки та масиву зображень
const wrapper = document.querySelector('.wrapper')
const images = [
  'cat.png',
  'cat2.png',
  'cat3.png',
  'dog.png',
  'dog2.png',
  'dog3.png',
]

// Додавання кожного зображення до елементу обгортки та випадкового розташування його на сторінці
images.forEach((image) => {
  const img = document.createElement('img')
  img.src = `pictures/${image}`

  img.addEventListener('load', () => {
    const parentWidth = wrapper.offsetWidth
    const parentHeight = wrapper.offsetHeight

    img.style.left = `${Math.random() * (parentWidth - img.offsetWidth)}px`
    img.style.top = `${Math.random() * (parentHeight - img.offsetHeight)}px`
  })

  wrapper.appendChild(img)
})

// Створення масиву зображень та функції, яка зміщує зображення при кліку на нього
const imagesArr = Array.from(wrapper.querySelectorAll('img'))

const moveImage = (event, img) => {
  const rect = img.getBoundingClientRect()
  const centerX = rect.left + rect.width / 2
  const centerY = rect.top + rect.height / 2

  let x = parseFloat(img.style.left)
  let y = parseFloat(img.style.top)

  if (event.clientX > centerX && event.clientY < centerY) {
    x -= 5
    y += 5
  } else if (event.clientX < centerX && event.clientY > centerY) {
    x += 5
    y -= 5
  } else if (event.clientX < centerX && event.clientY < centerY) {
    x += 5
    y += 5
  } else if (event.clientX > centerX && event.clientY > centerY) {
    x -= 5
    y -= 5
  }

  const parentWidth = wrapper.clientWidth
  const parentHeight = wrapper.clientHeight
  const childWidth = rect.width
  const childHeight = rect.height

  x = Math.max(0, Math.min(x, parentWidth - childWidth))
  y = Math.max(0, Math.min(y, parentHeight - childHeight))

  img.style.left = `${x}px`
  img.style.top = `${y}px`
}

// Перевірка наявності кішок та собак, та показ модального вікна
const showModalIfCatAndDog = () => {
  const catImages = imagesArr.filter((img) => img.src.includes('cat'))
  const dogImages = imagesArr.filter((img) => img.src.includes('dog'))
  const catDogIntersection = catImages.some((catImg) => {
    return dogImages.some((dogImg) => {
      const catImgRect = catImg.getBoundingClientRect()
      const dogImgRect = dogImg.getBoundingClientRect()
      const dx = catImgRect.left - dogImgRect.left
      const dy = catImgRect.top - dogImgRect.top
      const distance = Math.sqrt(dx * dx + dy * dy)
      return distance < catImgRect.width
    })
  })
  if (catDogIntersection) {
    showModal()
  }
}
// Додавання обробника подій на кожне зображення
imagesArr.forEach((img) => {
  img.addEventListener('click', (event) => {
    event.stopPropagation()
    moveImage(event, img)
    const imageName = img.src.split('/').pop()
    const dogs = ['dog.png', 'dog2.png', 'dog3.png']
    const cats = ['cat.png', 'cat2.png', 'cat3.png']
    if (dogs.includes(imageName) || cats.includes(imageName)) {
      showModalIfCatAndDog()
    }
  })
})

const modal = document.createElement('div') // Створюємо новий елемент div із змінною modal
modal.classList.add('modal') // Додаємо до цього елементу клас "modal"
modal.innerHTML = `

  <div class="modal-content">
    <span class="close">&times;</span>
    <p>собачка зіткнулася з кіцькою) Перезавантажте сторінку!</p>
  </div>
` // Заповнюємо HTML-кодом модальне вікно, яке міститься в змінній modal

document.body.appendChild(modal) // Додаємо модальне вікно до кінця тіла HTML-документа
const closeButton = modal.querySelector('.close') // Знаходимо кнопку закриття модального вікна

function showModal() {
  // Функція для показу модального вікна
  modal.style.display = 'block' // Змінюємо стиль CSS модального вікна на "display: block"
}

function hideModal() {
  // Функція для приховування модального вікна
  modal.style.display = 'none' // Змінюємо стиль CSS модального вікна на "display: none"
}

closeButton.addEventListener('click', hideModal) // Додаємо обробник події на кнопку закриття модального вікна, який викликає функцію hideModal

window.addEventListener('click', (event) => {
  // Додаємо обробник події на клік за межі модального вікна
  if (event.target == modal) {
    // Якщо елемент, на який натиснули, є саме модальним вікном
    hideModal() // Тоді приховуємо модальне вікно
  }
})
