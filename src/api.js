const todosApi = 'https://mate-api.herokuapp.com/todos';
const detailsApi = 'https://mate-api.herokuapp.com/users/';

export function getTodos() {
  return fetch(todosApi)
    .then(response => response.json());
}

export function getUser(userId) {
  return fetch(`${detailsApi}${userId}`)
    .then(response => response.json())
    .then(response => response.data);
}
