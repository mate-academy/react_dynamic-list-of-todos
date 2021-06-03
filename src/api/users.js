// eslint-disable-next-line
const API_URL = `https://mate-api.herokuapp.com/`;

export function getAll(url, options) {
  return fetch(
    !options ? `${API_URL}${url}` : `${API_URL}${url}${options}`,
  )
    .then(response => response.json());
}
