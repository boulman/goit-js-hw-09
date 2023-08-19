// Описаний в документації
import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';

import { galleryItems } from './gallery-items.js';
// Change code below this line

// console.log(galleryItems);

const gallary = document.querySelector('.gallery');

function createMarkup(arr) {
  const markup = arr
    .map(
      ({ preview, original, description }) => `<li class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`
    )
    .join('');
  gallary.insertAdjacentHTML('beforeend', markup);
}
createMarkup(galleryItems);

let gallery = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});
gallary.addEventListener('click', handleClick);

function handleClick(e) {
  e.preventDefault();
  if (e.target.className !== 'gallery__image') {
    return;
  }
  const { source } = e.target.dataset;

  console.log;
  gallery.on('show.simplelightbox');
}
