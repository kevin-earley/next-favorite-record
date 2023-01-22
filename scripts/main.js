import { ui } from './modules/ui.js';
import { lastfm } from './modules/lastfm.js';

const handleSubmit = async (event) => {
  if (event.preventDefault) {
    event.preventDefault();
  };

  ui.removeAlert();

  try {
    if (ui.artistInput01.value === '' || ui.artistInput02.value === '') {
      throw new Error('Please fill in both inputs.');
    };

    ui.hideForm();
    ui.appendLoader();

    const similarArtists = await lastfm.getSimilarArtists([ui.artistInput01.value, ui.artistInput02.value]);

    const filteredSimilarArtists = filterSimilarArtists(similarArtists);

    const randomSimilarArtist = filteredSimilarArtists[Math.floor(Math.random() * filteredSimilarArtists.length)];

    const topAlbums = await lastfm.getTopAlbums(randomSimilarArtist);

    if (topAlbums.length < 50) {
      throw new Error('Albums length error.');
    };

    ui.removeLoader();
    ui.showResults(filterTopAlbums(topAlbums));

  } catch(error) {
    if (error.message === 'Albums length error.') {
      handleSubmit(event);
    } else {
      ui.removeLoader();
      ui.showForm();
      ui.appendAlert(error.message);
    };
  };
};

const filterSimilarArtists = (similarArtists) => {
  const filteredSimilarArtists = similarArtists[0].filter((artist) => {
    return similarArtists[1].includes(artist);
  });

  if (filteredSimilarArtists.length === 0) {
    throw new Error('No matches found.');
  };

  return filteredSimilarArtists;
};

const filterTopAlbums = (topAlbums) => {
  const filteredTopAlbums = topAlbums.filter((album) => {
    return removeCompilations(album.name.toLowerCase());
  }).filter((album) => {
    return album.image[3]['#text'].length > 0;
  });

  return filteredTopAlbums[0];
};

const removeCompilations = (album) => {
  const compilationKeywords = 'best, collection, deluxe, disc, essential, greatest hits, hits, volume, edition, standard'.split(', ');
  let flag = 0;

  compilationKeywords.forEach((keyword) => {
    flag = flag + album.includes(keyword);
  });

  return (flag === 0);
};

const handleRedo = () => {
  ui.hideResults();
  ui.showForm();
};

ui.submitBtn.addEventListener('click', handleSubmit);
ui.redoLink.addEventListener('click', handleRedo);