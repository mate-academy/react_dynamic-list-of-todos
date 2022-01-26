const BASE_URL = 'https://mate.academy/students-api';

export async function request(url: string) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }

  return response.json();
}

export async function getTodos() {
  const todos: Todo[] = await request(`${BASE_URL}/todos`);

  return todos;
}

export async function getUserById(userId: number) {
  const user: User = await request(`${BASE_URL}/users/${userId}`);

  return user;
}
