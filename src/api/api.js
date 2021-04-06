const BASE_URL = 'https://mate-api.herokuapp.com';

function request(url) {
  return fetch(url)
    .then(response => response.json())
    .then(response => response.data)
    // eslint-disable-next-line no-console
    .catch(error => console.log(error));
}

export function loadTodos() {
  return request(`${BASE_URL}/todos`);
}

export function loadUsers(userId) {
  return request(`${BASE_URL}/users/${userId}`);
}
