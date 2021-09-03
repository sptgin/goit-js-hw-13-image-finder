import './styles.css';
import {
  alert,
  defaultModules,
} from '../node_modules/@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '../node_modules/@pnotify/mobile/dist/PNotifyMobile.js';
import debounce from 'lodash.debounce';
import icons from 'material-design-icons';

import imageSearchFormTemplate from './templates/imagesearchform.hbs';
import imagesListTemplate from './templates/imagegallery.hbs';
import imageCardTemplate from './templates/imagecard.hbs';
import SearchImageAPI from './apiService';
import { template } from 'handlebars';

const imageSearchInput = document.querySelector('#search-form');
const imageSearchList = document.querySelector('.gallery');
const imageSearchCard = document.querySelector('.photo-card');
const imageSearchMoreButton = document.querySelector('#search-more');
const imageSearchAPI = new SearchImageAPI();

imageSearchInput.addEventListener('input', debounce(imageSearch, 1000));
imageSearchMoreButton.addEventListener('click', imageSearcMore);

imageSearchList.scrollIntoView({
  behavior: 'smooth',
  block: 'end',
  inline: 'nearest',
});

function imageSearch(event) {
  event.preventDefault();
  if (imageSearchInput.firstElementChild.value === '') {
    imageSearchListClear();
    imageSearchAPI.resetPage();
    buttonNoDisplay(imageSearchMoreButton);
  } else {
    imageSearchGetData(imageSearchInput.firstElementChild.value);
    buttonDisplay(imageSearchMoreButton);
  }
}

function imageSearcMore(event) {
  event.preventDefault();
  imageSearchAPI.incrementPage();
  imageSearchGetData(imageSearchInput.firstElementChild.value);
}

function imageSearchGetData(query) {
  imageSearchAPI.query = query;
  imageSearchAPI
    .fetchImages()
    .then(images => {
      if (images.length !== 0) {
        imageSearchListMake(images);
      } else {
        alert({
          text: 'No matces found !',
          delay: 1000,
        });
      }
    })
    .catch(() => {
      alert({
        text: 'No data for search ...',
        delay: 1000,
      });
    });
}

function imageSearchListMake(images) {
  imageSearchList.insertAdjacentHTML(
    'beforeend',
    images.map(imageCardTemplate).map(imagesListTemplate).join(' '),
  );
}

function imageSearchListClear() {
  imageSearchList.innerHTML = '';
}

function buttonNoDisplay(element) {
  element.classList.remove('button_display');
  element.classList.add('button_nodisplay');
}

function buttonDisplay(element) {
  element.classList.remove('button_nodisplay');
  element.classList.add('button_display');
}
