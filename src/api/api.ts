const API_URL = 'https://mate.academy/students-api';

export function getTodos(): Promise<Todo[]> {
  return fetch(`${API_URL}/todos`)
    .then(response => response.json());
}

export function getUserById(userId: number): Promise<User> {
  return fetch(`${API_URL}/users/${userId}`)
    .then(response => response.json());
}

export function getTodosByStatus(status: string): Promise<Todo[]> {
  if (status === 'true' || status === 'false') {
    return fetch(`${API_URL}/todos?completed=${status}`)
      .then(response => response.json());
  }

  return getTodos();
}
