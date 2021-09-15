'use strict';

import { galleryItems } from './app.js';

function getItemMarkup(item) {
  return `
  <li class="gallery__item">
    <a
      class="gallery__link"
      href="${item.original}"
    >
      <img
        class="gallery__image js-gallery__image"
        src="${item.preview}"
        data-source="${item.original}"
        alt="${item.description}"
      />
    </a>
  </li>
  `;
}

function fillGalleryItems(gallery, items) {
  items.forEach((item) =>
    gallery.insertAdjacentHTML('beforeend', getItemMarkup(item))
  );
}

function handleGalleryClick(e) {
  e.preventDefault();

  if (e.target === e.currentTarget) {
    return;
  }

  if (e.target.classList.contains('js-gallery__image')) {
    const source = e.target.dataset.source;
    showImage(source);
    imageIndex = getImageIndex(source);
  }
}

function showImage(url) {
  image.setAttribute('src', url);
  modalWindow.classList.add('is-open');
}

function hideImage() {
  modalWindow.classList.remove('is-open');
  image.setAttribute('src', '');
}

function handleModalClick(e) {
  if (e.target === e.currentTarget) {
    return;
  }

  if (e.target === imageCloseButton || e.target === modalOverlay) {
    hideImage();
  }
}

function handleKeyUp(e) {
  if (!modalWindow.classList.contains('is-open')) {
    return;
  }
  switch (e.key) {
    case 'Escape':
      hideImage();
      break;
    case 'ArrowLeft':
      imageIndex = showPrevImage(imageIndex);
      break;
    case 'ArrowRight':
      imageIndex = showNextImage(imageIndex);
      break;

    default:
      break;
  }
}

function getImageIndex(source) {
  return galleryItems.findIndex((item) => item.original === source);
}

function showNextImage(index) {
  let nextIndex = index + 1;
  if (!(nextIndex < galleryItems.length)) {
    nextIndex = 0;
  }
  showImage(galleryItems[nextIndex].original);
  return nextIndex;
}

function showPrevImage(index) {
  let prevIndex = index - 1;
  if (prevIndex < 0) {
    prevIndex = galleryItems.length - 1;
  }
  showImage(galleryItems[prevIndex].original);
  return prevIndex;
}

const gallery = document.querySelector('.js-gallery');
const modalWindow = document.querySelector('.js-lightbox');
const image = modalWindow.querySelector('.js-lightbox__image');
const imageCloseButton = modalWindow.querySelector(
  'button[data-action="close-lightbox"]'
);
const modalOverlay = modalWindow.querySelector('div.lightbox__overlay');
let imageIndex = -1;

gallery.addEventListener('click', handleGalleryClick);
modalWindow.addEventListener('click', handleModalClick);
window.addEventListener('keyup', handleKeyUp);
fillGalleryItems(gallery, galleryItems);
