export function getTodos() {
  return fetch('https://mate-api.herokuapp.com/todos')
    .then(response => response.json())
    .catch(() => [])
    .then(todo => todo.data);
}

export function getUsers() {
  return fetch('https://mate-api.herokuapp.com/users')
    .then(response => response.json())
    .catch(() => [])
    .then(user => user.data);
}
