const BASE_URL = `https://mate-api.herokuapp.com`;

function request(url, options) {
  return fetch(url, options)
    .then((result) => {
      if (!result.ok) {
        throw new Error(`${result.status} - ${result.statusText}`);
      }

      return result.json();
    })
    .then(result => result.data);
}

export function getTodos() {
  return request(`${BASE_URL}/todos`);
}

export function getUser() {
  return request(`${BASE_URL}/users`);
}
