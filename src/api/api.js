const API_URL = `https://mate-api.herokuapp.com/`;

export function getTodos() {
  return fetch(`${API_URL}todos`)
    .then(response => response.json())
    .then(serverResponse => serverResponse.data || serverResponse)
    .then(todos => todos.filter(todo => todo.title));
}

export function getUsers(userId) {
  return fetch(`${API_URL}users/${userId}`)
    .then(response => response.json());
}
