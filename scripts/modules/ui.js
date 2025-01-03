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
		this.resultsTitleLink = document.querySelector('.results-title-link');
		this.resultsImg = document.querySelector('.results-img');
		this.resultsImgLink = document.querySelector('.results-img-link');
		this.linkNewResult = document.querySelector('.new-result');
		this.linkNewValues = document.querySelector('.new-values');
	}

	showForm() {
		this.form.style.display = 'block';
	}

	hideForm() {
		this.form.style.display = 'none';
	}

	showResults(similarArtistTopAlbum) {
		this.results.style.display = 'block';
		this.resultsArtistLink.textContent = similarArtistTopAlbum.artist.name;
		this.resultsArtistLink.href = `https://en.wikipedia.org/w/index.php?search=${similarArtistTopAlbum.artist.name.toLowerCase().replace(/ /g, '+')}`;
		this.resultsTitleLink.textContent = similarArtistTopAlbum.name;
		this.resultsTitleLink.href = `https://www.youtube.com/results?search_query=${similarArtistTopAlbum.artist.name.toLowerCase().replace(/ /g, '+')}+${similarArtistTopAlbum.name.toLowerCase().replace(/ /g, '+')}`;
		this.resultsImgLink.href = `https://www.youtube.com/results?search_query=${similarArtistTopAlbum.artist.name.toLowerCase().replace(/ /g, '+')}+${similarArtistTopAlbum.name.toLowerCase().replace(/ /g, '+')}`;
		this.resultsImg.src = similarArtistTopAlbum.image[3]['#text'];

		this.resultsArtistLink.addEventListener('click', () => {
			gtag('event', 'results_link_click', {
				event_category: 'Results Links',
				event_action: 'Click',
				event_label: 'Artist Text',
			});
		});

		this.resultsTitleLink.addEventListener('click', () => {
			gtag('event', 'results_link_click', {
				event_category: 'Results Links',
				event_action: 'Click',
				event_label: 'Album Text',
			});
		});

		this.resultsImgLink.addEventListener('click', () => {
			gtag('event', 'results_link_click', {
				event_category: 'Results Links',
				event_action: 'Click',
				event_label: 'Album Image',
			});
		});
	}

	hideResults() {
		this.results.style.display = 'none';
		this.resultsArtistLink.textContent = '';
		this.resultsArtistLink.href = '';
		this.resultsTitleLink.textContent = '';
		this.resultsTitleLink.href = '';
		this.resultsImgLink.href = '';
		this.resultsImg.src = '';
	}

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

	appendError(text) {
		const errorText = document.createElement('p');
		errorText.classList.add('error-text');
		errorText.textContent = text;
		this.card.appendChild(errorText);
	}

	removeError() {
		if (document.querySelector('.error-text') !== null) {
			document.querySelector('.error-text').remove();
		}
	}
}

export const ui = new UI();
