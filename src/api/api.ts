const BASE_URL = 'https://mate.academy/students-api';

const request = (url: string) => {
  return fetch(`${BASE_URL}${url}`)
    .then(response => response.json());
};

export function getTodos(): Promise<Todo[]> {
  return request('/todos');
}

export function getUser(userId: number): Promise<User> {
  return request(`/users/${userId}`);
}
