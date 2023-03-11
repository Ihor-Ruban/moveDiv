// let theSquare = document.getElementById('square')
let catDog = document.querySelector('.catDog')

catDog.addEventListener('click', () => {
  let x = Math.floor(Math.random() * 500) + 1
  let y = Math.floor(Math.random() * 500) + 1

  catDog.style.left = x + 'px'
  catDog.style.top = y + 'px'

})




// let randomImg = { dog1: 1, dog2: 2, dog3: 3, cat1: 4, cat2: 5, cat3: 6 }

// for (let key in randomImg) {
//   let img = document.createElement('img')
//   img.setAttribute('data-key', key)
//   img.src = 'pictures/' + key + '.png'
//   catDog.append(img)
// }