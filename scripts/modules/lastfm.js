class Lastfm {
  constructor() {
    this.apiKey = 'c136737ab26b0afd9e14e201b8571111';
  }

  artificialLoad(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async getSimilarArtists(artists) {
    let mappedSimilarArtists = [];

    for (let i = 0; i < 2; i++) {
      await this.artificialLoad(500);

      const data = await fetch(`https://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist=${artists[i]}&api_key=${this.apiKey}&format=json&autocorrect[0|1]`);      
      const parsed = await data.json();

      if (data.status >= 400 && data.status < 600) throw new Error(parsed.message);
      if (parsed.error) throw new Error(`Artist #${i + 1} not found.`);

      mappedSimilarArtists.push(parsed.similarartists.artist.map(artist => artist.name));
    }

    return mappedSimilarArtists;
  }

  async getTopAlbums(artist) {
    const data = await fetch(`https://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=${artist}&api_key=${this.apiKey}&format=json`);
    const parsed = await data.json();

    if (data.status >= 400 && data.status < 600) throw new Error(parsed.message);

    return parsed.topalbums.album;    
  }
}

export const lastfm = new Lastfm();