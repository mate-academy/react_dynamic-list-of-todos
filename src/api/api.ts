const API_BASE_URL = 'https://mate.academy/students-api';

export function getAllTodos(): Promise<Todo[]> {
  return fetch(`${API_BASE_URL}/todos`)
    .then(response => response.json());
}

export function getUserById(id: number): Promise<User> {
  return fetch(`${API_BASE_URL}/users/${id}`)
    .then(response => response.json());
}

export function UpdateCheckTodo(id: number, isChecked: boolean) {
  return fetch(`${API_BASE_URL}/todos/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({ completed: !isChecked }),
  });
}
