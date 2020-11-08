const BASE_URL = 'https://mate-api.herokuapp.com/';

export function getAll(apiElement) {
  return fetch(BASE_URL + apiElement)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`${response.status} - ${response.statusText}`);
      }

      return response.json();
    });
}
