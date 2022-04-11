const API_TODOS = 'https://mate.academy/students-api/todos';
const API_USER = 'https://mate.academy/students-api/users/';

export function getTodos() {
  return fetch(API_TODOS)
    .then(response => {
      return response.json();
    });
}

export function getUser(url: number) {
  return fetch(`${API_USER}${url}`)
    .then(response => {
      return response.json();
    });
}
