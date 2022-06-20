const API_URL_USERS = 'https://mate.academy/students-api/users';
const API_URL_TODOS = 'https://mate.academy/students-api/todos';

export function getUser(userId:number) {
  return fetch(`${API_URL_USERS}/${userId}`)
    .then(response => response.json());
}

export function getTodos() {
  return fetch(API_URL_TODOS)
    .then(response => response.json());
}
