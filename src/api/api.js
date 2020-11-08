const API_TODOS = `https://mate-api.herokuapp.com/todos`;
const API_USERS = `https://mate-api.herokuapp.com/users`;

export function getTodos() {
  return fetch(API_TODOS)
    .then(response => response.json())
    .then(result => result.data);
}

export function getUser(userId) {
  return fetch(`${API_USERS}/${userId}`)
    .then(response => response.json())
    .then(result => result.data);
}
