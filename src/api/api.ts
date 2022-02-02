// eslint-disable-next-line
const API_TODOS_URL = `https://mate.academy/students-api/todos`;

export function getAllTodos(): Promise<Todo[]> {
  return fetch(API_TODOS_URL)
    .then(response => response.json());
}

export function getUser(userId: number): Promise<User> {
  // eslint-disable-next-line
  const API_USERS_URL = `https://mate.academy/students-api/users/${userId}`;

  return fetch(API_USERS_URL)
    .then(response => response.json());
}

export function getTodoByComlete(complited: boolean): Promise<Todo[]> {
  // eslint-disable-next-line
  const API_USERS_URL = `https://mate.academy/students-api/todos?completed=${complited.toString()}`;

  return fetch(API_USERS_URL)
    .then(response => response.json());
}
