const url = 'https://mate.academy/students-api';

export async function getTodos(): Promise<Todo[]> {
  const response = await fetch(`${url}/todos`);

  return response.json();
}

export async function getUsers(userId: number): Promise<User> {
  const response = await fetch(`${url}/users/${userId}`);

  return response.json();
}
