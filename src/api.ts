const apiURL = 'https://mate.academy/students-api/todos';
const apiUsersURL = 'https://mate.academy/students-api/users/';

export function getTodos(): Promise<Todo[]> {
  return fetch(apiURL)
    .then(promise => promise.json());
}

export function getUser(userId: number): Promise<User> {
  return fetch(`${apiUsersURL}${userId}`)
    .then(promise => promise.json());
}
