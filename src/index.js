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
const imageSearchAPI = new SearchImageAPI();

imageSearchInput.addEventListener('input', debounce(imageSearch, 1000));

function imageSearch(event) {
  event.preventDefault();
  imageSearchAPI.query = imageSearchInput.firstElementChild.value;
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
  console.log('imageSearchListMake - START');
  console.log(images);

  // const imageSearchCardArray = images.map(imageCardTemplate).join(' ');

  // console.log(imageSearchCardArray);

  imageSearchCard.insertAdjacentHTML(
    'beforeend',
    images.map(imageCardTemplate).map(imagesListTemplate).join(' '),
  );

  // imageSearchList.insertAdjacentHTML(
  //   'beforeend',
  //   imageSearchCard.map(imagesListTemplate).join(' '),
  // );
  // console.log(imageSearchList);
  console.log('imageSearchListMake - DONE');
}

function imageSearchListClear() {
  imageSearchList.innerHTML = '';
}
