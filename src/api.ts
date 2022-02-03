const URL_TODOS = 'https://mate.academy/students-api/todos';
const URL_USERS = 'https://mate.academy/students-api/users/';

export function getTodos(): Promise<Todo[]> {
  return fetch(URL_TODOS)
    .then(response => response.json());
}

export function getUser(idUser: number): Promise<User> {
  return fetch(URL_USERS + idUser)
    .then(response => response.json());
}
