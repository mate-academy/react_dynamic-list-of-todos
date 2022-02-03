const API_URL = 'https://mate.academy/students-api';

export function getTodosFromServer(completed?: boolean): Promise<Todo[]> {
  let url: string;

  if (completed !== undefined) {
    url = `${API_URL}/todos?completed=${completed.toString()}`;
  } else {
    url = `${API_URL}/todos`;
  }

  return fetch(url)
    .then(response => response.json());
}

export function getUserFromServer(userId: number): Promise<User> {
  const url = `${API_URL}/users/${userId}`;

  return fetch(url)
    .then(response => response.json());
}
