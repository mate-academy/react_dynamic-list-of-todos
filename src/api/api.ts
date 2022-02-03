export function getTodosFromServer(complited?: boolean): Promise<Todo[]> {
  let API_TODOS_URL: string;

  if (complited !== undefined) {
    API_TODOS_URL = `https://mate.academy/students-api/todos?completed=${complited.toString()}`;
  } else {
    // eslint-disable-next-line
    API_TODOS_URL = `https://mate.academy/students-api/todos`;
  }

  return fetch(API_TODOS_URL)
    .then(response => response.json());
}

export function getUser(userId: number): Promise<User> {
  // eslint-disable-next-line
  const API_USERS_URL = `https://mate.academy/students-api/users/${userId}`;

  return fetch(API_USERS_URL)
    .then(response => response.json());
}
