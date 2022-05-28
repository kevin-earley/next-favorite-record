import { ui } from "./modules/ui.js";
import { lastfm } from "./modules/lastfm.js";

ui.submitBtn.addEventListener('click', clickSubmit);
ui.redoLink.addEventListener('click', clickRedo);
2
function clickSubmit(event) {
  ui.removeAlert();

  if (ui.artistInput01.value !== '' && ui.artistInput02.value !== '') {
    ui.hideForm();
    ui.appendLoader();

    setTimeout(function(){
    
      lastfm.getRandomCommonSimilarArtist(ui.artistInput01.value, ui.artistInput02.value)
      .then(randomSimilarArtist => {
        return lastfm.getArtistTopAlbum(randomSimilarArtist)
      })
      .then(similarArtistTopAlbum => {
        ui.removeLoader();
        ui.showResults(similarArtistTopAlbum);
      })
      .catch(error => {
        if (error.message === 'Albums length error') {
          clickSubmit();
        } else {
          ui.removeLoader();
          ui.showForm();
          ui.appendAlert(error.message);
        }
      })

    }, 1000);

  } else {
    ui.appendAlert('Fill in both inputs.');
  }

  if (event) {
    event.preventDefault();
  }
}

function clickRedo(event) {
  ui.hideResults();
  ui.showForm();

  if (event) {
    event.preventDefault();
  }
}