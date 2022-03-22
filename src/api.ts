const BASE_URL = 'https://mate.academy/students-api/';

export function getTodos() {
  return fetch(`${BASE_URL}/todos`)
    .then(response => response.json());
}

export function getUser(UserId: number): Promise<User> {
  return fetch(`${BASE_URL}/users/${UserId}`)
    .then(response => response.json());
}
