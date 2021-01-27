export function getTodos() {
  return fetch('https://mate-api.herokuapp.com/todos')
    .then(response => response.json());
}

export function getUserInfo(id) {
  return fetch(`https://mate-api.herokuapp.com/users/${id}`)
    .then(response => response.json())
    .catch();
}
