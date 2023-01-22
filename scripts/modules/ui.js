class UI {
  constructor() {
    this.card = document.querySelector('.card');
    this.form = document.querySelector('.form');
    this.artistInput01 = document.querySelector('#artist-input-01');
    this.artistInput02 = document.querySelector('#artist-input-02');
    this.submitBtn = document.querySelector('.submit');
    this.results = document.querySelector('.results');
    this.resultsAlbumArtist = document.querySelector('.results-album-artist');
    this.resultsAlbumArtistLink = document.querySelector('.results-album-artist-link');
    this.resultsAlbumTitle = document.querySelector('.results-album-title');
    this.resultsAlbumTitleLink = document.querySelector('.results-album-title-link');
    this.resultsAlbumLink = document.querySelector('.results-album-link');
    this.resultsAlbumImg = document.querySelector('.results-album-img');
    this.redoLink = document.querySelector('.results-redo-link');
  };

  // Form Functions
  showForm = () => {
    this.form.style.display = 'block';
  };

  hideForm = () => {
    this.form.style.display = 'none';
  };
  
  // Results Functions
  showResults = (similarArtistTopAlbum) => {
    this.results.style.display = 'block';
    this.resultsAlbumArtistLink.textContent = similarArtistTopAlbum.artist.name;
    this.resultsAlbumArtistLink.href = `https://en.wikipedia.org/w/index.php?search=${similarArtistTopAlbum.artist.name.toLowerCase().replace(/ /g,'+')}`;
    this.resultsAlbumTitleLink.textContent = similarArtistTopAlbum.name;
    this.resultsAlbumTitleLink.href = `https://www.youtube.com/results?search_query=${similarArtistTopAlbum.artist.name.toLowerCase().replace(/ /g,'+')}+${similarArtistTopAlbum.name.toLowerCase().replace(/ /g,'+')}`;
    this.resultsAlbumLink.href = `https://www.youtube.com/results?search_query=${similarArtistTopAlbum.artist.name.toLowerCase().replace(/ /g,'+')}+${similarArtistTopAlbum.name.toLowerCase().replace(/ /g,'+')}`;
    this.resultsAlbumImg.src = similarArtistTopAlbum.image[3]['#text'];
  };

  hideResults = () => {
    this.results.style.display = 'none';
    this.resultsAlbumArtistLink.textContent = '';
    this.resultsAlbumArtistLink.href = '';
    this.resultsAlbumTitleLink.textContent = '';
    this.resultsAlbumTitleLink.href = '';
    this.resultsAlbumLink.href = '';
    this.resultsAlbumImg.src = '';
  };

  // Loader Functions
  appendLoader = () => {
    if (document.querySelector('.loader') === null) {
      const loaderImg = document.createElement('div');
      loaderImg.classList.add('loader');
      this.card.appendChild(loaderImg);
    };
  };

  removeLoader = () => {
    if (document.querySelector('.loader') !== null) {
      document.querySelector('.loader').remove();
    };
  };

  // Alert Functions
  appendAlert = (msg) => {
    const alertMsg = document.createElement('p');
    alertMsg.classList.add('alert-msg');
    alertMsg.textContent = msg;
    this.card.appendChild(alertMsg);
  };

  removeAlert = () => {
    if (document.querySelector('.alert-msg') !== null) {
      document.querySelector('.alert-msg').remove();
    };
  };
};

export const ui = new UI();