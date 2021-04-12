const API_URL = 'https://mate-api.herokuapp.com/';

export function request(url) {
  return fetch(`${API_URL}${url}`)
    .then(async response => (await response.json()).data);
}
