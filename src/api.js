const url = 'https://mate-api.herokuapp.com/todos';

export function getAll() {
  return fetch(url)
    .then(todos => todos.json());
}

export function getUser(userId) {
  return fetch(`https://mate-api.herokuapp.com/users/${userId}`)
    .then(todos => todos.json());
}
