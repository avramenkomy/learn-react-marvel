class MarvelService {
  _apiBase = 'https://gateway.marvel.com:443/v1/public/';
  _apiKey = 'd25dfe06edad06841a07ee7b5f26b29b';
  getResource = async (url) => {
    let res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
  }

  // Получение всех персонажей
  getAllCharacters = () => {
    return this.getResource(`${this._apiBase}characters?limit=9&offset=210&apikey=${this._apiKey}`);
  }

  // Получение одного персонажа
  getCharacter = (id) => {
    return this.getResource(`${this._apiBase}characters/${id}?apikey=${this._apiKey}`);
  }
}

export default MarvelService;