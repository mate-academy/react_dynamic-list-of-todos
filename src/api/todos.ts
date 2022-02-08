// eslint-disable-next-line
const API_URL = `https://mate.academy/students-api`;

export function getCurrentUser(userId: number): Promise<Todo[]> {
  return fetch(`${API_URL}/users/${userId}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('error download user');
      }

      return response.json();
    });
}

export function getTodos(addUrl: string): Promise<Todo[]> {
  return fetch(`${API_URL}${addUrl}`)
    .then(response => response.json());
}
