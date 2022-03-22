const BASE_URL = 'https://mate.academy/students-api/';

function request(endpoint: string) {
  return fetch(`${BASE_URL}${endpoint}`)
    .then(response => response.json());
}

export function getTodos() {
  return request('/todos');
}

export function getUser(UserId: number): Promise<User> {
  return request(`/users/${UserId}`);
}
