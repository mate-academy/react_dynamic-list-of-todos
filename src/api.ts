const URL = 'https://mate.academy/students-api/todos';
const URL_USERS = 'https://mate.academy/students-api/users';

export function requestTodoList() {
  return fetch(URL)
    .then(todos => todos.json());
}

export function requestUserById(userId: number) {
  return fetch(`${URL_USERS}/${userId}`)
    .then(user => user.json());
}
