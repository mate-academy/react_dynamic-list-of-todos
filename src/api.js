export function getAllTodos() {
  return fetch('https://mate-api.herokuapp.com/todos')
    .then(response => response.json());
}

export function getUserById(id) {
  return fetch(`https://mate-api.herokuapp.com/users/${id}`)
    .then(response => response.json());
}
