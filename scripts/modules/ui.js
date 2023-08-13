class UI {
	constructor() {
		this.card = document.querySelector('.card');
		this.form = document.querySelector('.form');
		this.artistInput01 = document.querySelector('#artist-input-01');
		this.artistInput02 = document.querySelector('#artist-input-02');
		this.btnSubmit = document.querySelector('.submit');
		this.results = document.querySelector('.results');
		this.resultsArtistLink = document.querySelector('.results-artist-link');
		this.resultsTitle = document.querySelector('.results-title');
		this.resultsImg = document.querySelector('.results-img');
		this.btnYouTube = document.querySelector('.youtube');
		this.btnDiscogs = document.querySelector('.discogs');
		this.linkNewResult = document.querySelector('.new-result');
		this.linkNewValues = document.querySelector('.new-values');
	}

	// Form Functions
	showForm() {
		this.form.style.display = 'block';
	}

	hideForm() {
		this.form.style.display = 'none';
	}

	// Results Functions
	showResults(similarArtistTopAlbum) {
		this.results.style.display = 'block';

		this.resultsArtistLink.textContent = similarArtistTopAlbum.artist.name;

		this.resultsArtistLink.href = `https://en.wikipedia.org/w/index.php?search=${similarArtistTopAlbum.artist.name.toLowerCase().replace(/ /g, '+')}`;

		this.resultsTitle.textContent = similarArtistTopAlbum.name;

		this.resultsImg.src = similarArtistTopAlbum.image[3]['#text'];

		this.btnYouTube.href = `https://www.youtube.com/results?search_query=${similarArtistTopAlbum.artist.name.toLowerCase().replace(/ /g, '+')}+${similarArtistTopAlbum.name.toLowerCase().replace(/ /g, '+')}`;

		this.btnDiscogs.href = `https://www.discogs.com/search/?q=${similarArtistTopAlbum.artist.name.toLowerCase().replace(/ /g, '+')}+${similarArtistTopAlbum.name.toLowerCase()}`;
	}

	hideResults() {
		this.results.style.display = 'none';
		this.resultsArtistLink.textContent = '';
		this.resultsArtistLink.href = '';
		this.resultsTitle.textContent = '';
		this.resultsImg.src = '';
	}

	// Loader Functions
	appendLoader() {
		if (document.querySelector('.loader') === null) {
			const loaderImg = document.createElement('div');
			loaderImg.classList.add('loader');
			this.card.appendChild(loaderImg);
		}
	}

	removeLoader() {
		if (document.querySelector('.loader') !== null) {
			document.querySelector('.loader').remove();
		}
	}

	// Alert Functions
	appendAlert(msg) {
		const alertMsg = document.createElement('p');
		alertMsg.classList.add('alert-msg');
		alertMsg.textContent = msg;
		this.card.appendChild(alertMsg);
	}

	removeAlert() {
		if (document.querySelector('.alert-msg') !== null) {
			document.querySelector('.alert-msg').remove();
		}
	}
}

export const ui = new UI();
