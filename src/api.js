const TODOS_URL = `https://mate-api.herokuapp.com/todos`;
const USER_URL = `https://mate-api.herokuapp.com/users/`;

export function getTodos() {
  return fetch(TODOS_URL)
    .then(response => response.json());
}

export function getUserId(id) {
  return fetch(`${USER_URL}${id}`)
    .then(response => response.json())
    .then(result => result.data);
}
