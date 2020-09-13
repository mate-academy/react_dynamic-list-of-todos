const BASE_URL = 'https://mate-api.herokuapp.com';

export function getTodos() {
  return fetch(`${BASE_URL}/todos`)
    .then(response => response.json())
    .then(result => result.data
      .filter(todo => todo.title && todo.userId && todo.completed !== null));
}

export function getUser(userId) {
  return fetch(`${BASE_URL}/users/${userId}`)
    .then(response => response.json())
    .then(result => result.data);
}
