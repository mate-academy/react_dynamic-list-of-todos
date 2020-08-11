const BASE_URL = 'https://jsonplaceholder.typicode.com';

export async function getTodo(): Promise<Todo[]> {
  return fetch(`${BASE_URL}/todos`).then(res => res.json());
}

export async function getUser(): Promise<User[]> {
  return fetch(`${BASE_URL}/users`).then(res => res.json());
}
