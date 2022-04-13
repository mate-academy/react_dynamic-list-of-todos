const BASE_URL = 'https://mate.academy/students-api';

function request(url: string) {
  return fetch(`${BASE_URL}${url}`)
    .then(response => response.json());
}

export function getTodos(): Promise<Todo[]> {
  return request('/todos');
}

export function getUserById(userId: number): Promise<User> {
  return request(`/users/${userId}/`);
}
