const BASE_URL = 'https://mate-api.herokuapp.com';

export function request(url, options) {
  return fetch(
    !options ? `${BASE_URL}${url}` : `${BASE_URL}${url}${options}`,
  )
    .then(response => response.json());
}
