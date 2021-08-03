export const BASE_URL = 'https://mate-api.herokuapp.com';

export function request(firstRequest, secondRequest = '') {
  return (
    fetch(`${BASE_URL}${firstRequest}${secondRequest}`)
      .then(response => response.json())
      .then(result => result.data)
  );
}
