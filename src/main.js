const imgContainer = document.getElementById("img-container");
const loader = document.getElementById("loader");
let ready = false
let imgLoaded = 0;
let totalImg = 0;


let photoArray = [];

function setAtr(elem, atr) {
  for (const key in atr) {
    elem.setAttribute(key, atr[key])
  }
}

function imgLoad() {
  imgLoaded++;
  if (imgLoaded === totalImg) {
    loader.hidden = true;
    ready = true
    count = 30;
    apiUrl = `https://api.unsplash.com/photos/random/?client_id=${key}&count=${count}`
  }
}

function displayPhotos() {
  totalImg = photoArray.length

  photoArray.forEach(photo => {
    const item = document.createElement('a')
    setAtr(item, {
      'href': photo.links.html,
      'target': '_blank'
    })
    const img = document.createElement('img')
    setAtr(img, {
      'src': photo.urls.regular,
      'alt': photo.alt_description,
      'title': photo.alt_description
    })

    img.addEventListener("load", imgLoad);

    item.appendChild(img)
    imgContainer.appendChild(item)
  })
}

// Unsplash
let count = 5;
const key = '5C7koAF6oG-j0es1Qx1y142Nn1TSNLu0127751C-54M';
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${key}&count=${count}`


async function getPhotos() {
  try {
    const response = await fetch(apiUrl)
    photoArray = await response.json();
    displayPhotos();
  } catch (err) {
    console.log(err);
  }
}


window.addEventListener("scroll", () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
    ready = false;
    imgLoaded = 0;
    getPhotos();
  }
})

getPhotos();