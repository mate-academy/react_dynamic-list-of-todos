// eslint-disable-next-line
const BASE_URL = `https://mate-api.herokuapp.com`;

export function request(url, options) {
  return fetch(url, options)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`${response.status} - ${response.statusText}`);
      }

      return response.json();
    })
    .then(result => result.data);
}

export function getTodos() {
  return request(`${BASE_URL}/todos`)
    .then(todos => todos.filter(({ id, title, userId, completed }) => (
      id && title && userId && typeof (completed) === 'boolean'
    )));
}

export function getUsers() {
  return request(`${BASE_URL}/users/`);
}
