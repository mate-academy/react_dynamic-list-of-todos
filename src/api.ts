export const API_URL = 'https://mate.academy/students-api';

export function request(query: string) {
  return fetch(`${API_URL}${query}`)
    .then(response => response.json());
}

export const getTodos = (): Promise<Todo[]> => request('/todos');

export const getUserById = (userId: number): Promise<User> => request(`/users/${userId}`);
