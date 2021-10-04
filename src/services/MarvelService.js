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
  getAllCharacters = async () => {
    const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=210&apikey=${this._apiKey}`);
    return res.data.results.map(this._transformCharacter);
  }

  // Получение одного персонажа
  getCharacter = async (id) => {
    const res = await this.getResource(`${this._apiBase}characters/${id}?apikey=${this._apiKey}`);
    // трансформируем данные с помощью дополнительного метода класса
    return this._transformCharacter(res.data.results[0]);
  }

  _transformCharacter = (char) => {
    return {
      name: char.name,
      description: char.description,
      thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
    }
  }
}

export default MarvelService;