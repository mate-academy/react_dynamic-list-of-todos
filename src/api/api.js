// eslint-disable-next-line
const API_URL = `https://mate-api.herokuapp.com/`;

export function getAll(url) {
  return fetch(`${API_URL}${url}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`${response.status} - ${response.statusText}`);
      }

      return response.json();
    });
}
