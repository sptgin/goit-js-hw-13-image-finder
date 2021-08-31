const API_KEY = '5018958-ed49ccd90878e6614abdf24a6';
const TYPE = 'image_type=photo';
const ORIENTATION = 'orientation=horizontal';
const BASE_URL = 'https://pixabay.com/api/';

export default class SearchImageAPI {
  constructor() {
    this.searchQuery = '';
  }

  fetchImages() {
    const url = `${BASE_URL}?${TYPE}&${ORIENTATION}&q=${this.searchQuery}&page=1&per_page=12&key=${API_KEY}`;
    return fetch(url)
      .then(response => response.json())
      .then(images => {
        return images.hits;
      })
      .catch();
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
