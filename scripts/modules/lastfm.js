class Lastfm {
  constructor() {
    this.apiKey = 'c136737ab26b0afd9e14e201b8571111';
  }


  async getRandomCommonSimilarArtist(artist01, artist02) {
    let artistInputValues = [artist01, artist02];
    let mappedSimilarArtists = [];

    for (let i = 0; i < 2; i++) {
      // fetch artist data from api
      let fetchedData = await fetch (`https://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist=${artistInputValues[i]}&api_key=${this.apiKey}&format=json&autocorrect[0|1]`);

      // throw error if bad response from api
      if (fetchedData.status >= 400 && fetchedData.status < 600) {
        let parsedJsonData = await fetchedData.json();
        
        throw new Error(parsedJsonData.message);

      } else {
        // if no error, await parsed json
        let parsedJsonData = await fetchedData.json();

        // throw error if unable to find artist
        if (parsedJsonData.error) {
          throw new Error(`Artist #${i + 1} not found.`)

        } else {
          // map similar artists' names and push them to mappedSimilarArtists
          mappedSimilarArtists.push(parsedJsonData.similarartists.artist.map(artist => artist.name));
        }
      }
    }

    // create an arr with all matching artist names found in both arrs in mappedSimilarArtists
    const filteredSimilarArtists = mappedSimilarArtists[0].filter(artist => mappedSimilarArtists[1].includes(artist));

    // throw error if no artists are found in either arrs in mappedSimilarArtists
    if (filteredSimilarArtists.length === 0) {
      throw new Error('No matches found.');

    } else {
      // set a random similar artist from filteredSimilarArtists
      const randomSimilarArtist = filteredSimilarArtists[Math.floor(Math.random() * filteredSimilarArtists.length)];

      return randomSimilarArtist;
    }
  }

  
  async getArtistTopAlbum(randomSimilarArtist) {   
    let similarArtistTopAlbum;

    // fetch artist's top albums data from api 
    const fetchedData = await fetch(`https://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=${randomSimilarArtist}&api_key=${this.apiKey}&format=json`);

    // throw error if bad response from api
    if (fetchedData.status >= 400 && fetchedData.status < 600) {
      throw new Error('Bad response from server, please try again.');

    } else {
      // if no error, await parsed json
      const parsedJsonData = await fetchedData.json();

      // assign artist albums obj to a variable
      const artistAlbums = parsedJsonData.topalbums.album;

      if (artistAlbums.length < 50) {
        throw new Error('Albums length error');
      }
    
      // function to filter out compilation albums
      function doesNotContain(albumName) {
        const compilationKeywords = "best, collection, deluxe, disc, essential, greatest hits, hits, volume, edition, standard".split(", ");
        let flag = 0;

        compilationKeywords.forEach(function(keyword) {
          flag = flag + albumName.includes(keyword)
        });

        return (flag === 0);
      }
  
      // filter out compilaton albums
      const filteredAlbumsByCompKeywords = artistAlbums.filter(album => doesNotContain(album.name.toLowerCase()));
  
      // filter out albums with missing imgs
      const filteredAlbumsByMissingImgs = filteredAlbumsByCompKeywords.filter(album => album.image[3]["#text"].length > 0);
  
      // assign top album obj to similarArtistTopAlbum variable
      similarArtistTopAlbum = filteredAlbumsByMissingImgs[0];
    }

    return similarArtistTopAlbum;
  }
}


export const lastfm = new Lastfm();