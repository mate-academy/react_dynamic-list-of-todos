// eslint-disable-next-line
const API_URL = `https://mate.academy/students-api`;

export function getAllTodos(): Promise<Todo[]> {
  return fetch(`${API_URL}/todos`)
    .then(response => response.json());
}

export function getCompletedTodos(): Promise<Todo[]> {
  return fetch(`${API_URL}/todos?completed=true`)
    .then(response => response.json());
}

export function getActiveTodos(): Promise<Todo[]> {
  return fetch(`${API_URL}/todos?completed=false`)
    .then(response => response.json());
}

export function getCurrentUser(userId: number): Promise<Todo[]> {
  // eslint-disable-next-line no-console
  console.log(`${API_URL}/users/${userId}`);

  return fetch(`${API_URL}/users/${userId}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('404');
      }

      return response.json();
    });
}

export function getTodos(addUrl: string): Promise<Todo[]> {
  return fetch(`${API_URL}${addUrl}`)
    .then(response => response.json());
}
