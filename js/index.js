// let randomImg = { dog1: 1, dog2: 2, dog3: 3, cat1: 4, cat2: 5, cat3: 6 }

let catDog = document.querySelector('.catDog')

catDog.addEventListener('click', (e) => {
  let rect = e.target.getBoundingClientRect()
  let x = e.clientX - rect.left
  let y = e.clientY - rect.top
  console.log('Left: ' + x + ' Top: ' + y)

  if (x <= 60 && y <= 60) {
    console.log('привет')
    return
  }
  if (x >= 60 && y >= 60) {
    console.log('пока')
    return
  }
  if (x <= 60 && y >= 60) {
    console.log('ну')
    return
  }
  if (x >= 60 && y <= 60) {
    console.log('ну')
    return
  }
})

// for (let key in randomImg) {
//   let img = document.createElement('img')
//   img.setAttribute('data-key', key)
//   img.src = 'pictures/' + key + '.png'
//   catDog.append(img)
// }
