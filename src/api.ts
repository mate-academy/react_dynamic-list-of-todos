const API_URL = 'https://mate.academy/students-api';

export async function getTodos(): Promise<Todo[]> {
  const response = await fetch(`${API_URL}/todos`);
  const json = await response.json();

  return json;
}

export async function getUser(userId: number): Promise<User> {
  const response = await fetch(`${API_URL}/users/${userId}`);
  const json = await response.json();

  return json;
}
