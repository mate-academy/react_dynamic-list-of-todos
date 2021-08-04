const TODOS_URL = 'https://mate-api.herokuapp.com/todos';
const USERS_URL = 'https://mate-api.herokuapp.com/users/';

const request = url => fetch(url)
  .then(response => response.json())
  .then(result => result.data);

export function getTodos() {
  return request(TODOS_URL);
}

export function getUser(userId) {
  return request(`${USERS_URL}${userId}`);
}
