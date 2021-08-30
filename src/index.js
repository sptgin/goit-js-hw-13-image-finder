import './styles.css';
import {
  alert,
  defaultModules,
} from '../node_modules/@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '../node_modules/@pnotify/mobile/dist/PNotifyMobile.js';
import debounce from 'lodash.debounce';
import icons from 'material-design-icons';

import imageSearchFormTemplate from './templates/imagesearchform.hbs';
// import countryListTemplate from './templates/countrylist.hbs';
// import countryCardTemplate from './templates/countrycard.hbs';

import SearchImageAPI from './apiService';
import { template } from 'handlebars';

const imageSearchInput = document.querySelector('.search-form');
const imageSearchList = document.querySelector('.gallery');
const imageSearchCard = document.querySelector('.photo-card');
const imageSearchAPI = new SearchImageAPI();

//imageSearchInput.addEventListener('input', debounce(imageSearch, 1000));

function imageSearch(event) {
  event.preventDefault();
  imageSearchAPI.query = imageSearchInput.value;
}

// function countrySearch(event) {
//   event.preventDefault();
//   countrySearchListClear();
//   countrySearchCardClear();
//   сountrySearchAPI.query = countrySearchInput.value;
//   сountrySearchAPI
//     .fetchCountries()
//     .then(countres => {
//       if (countres.length === 1) {
//         countrySearchCardMake(countres);
//       } else {
//         if (countres.length > 1 && countres.length < 11) {
//           countrySearchListMake(countres);
//         } else {
//           if (countres.length > 10) {
//             alert({
//               text: 'Too many matces found !',
//               delay: 1000,
//             });
//           } else {
//             alert({
//               text: 'No matces found !',
//               delay: 1000,
//             });
//           }
//         }
//       }
//       countrySearchInput.value = '';
//     })
//     .catch(() => {
//       alert({
//         text: 'No data for search ...',
//         delay: 1000,
//       });
//     });
// }

// function countrySearchListMake(countres) {
//   countrySearchList.insertAdjacentHTML(
//     'beforeend',
//     countres.map(countryListTemplate).join(' '),
//   );
// }
// function countrySearchListClear() {
//   countrySearchList.innerHTML = '';
// }
// function countrySearchCardMake(countres) {
//   countrySearchCard.insertAdjacentHTML(
//     'beforeend',
//     countres.map(countryCardTemplate).join(' '),
//   );
// }
// function countrySearchCardClear() {
//   countrySearchCard.innerHTML = '';
// }
