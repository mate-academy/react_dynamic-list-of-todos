const URL = 'https://mate.academy/students-api';

export async function getTodos(): Promise<Todo[]> {
  const response = await fetch(`${URL}/todos`);

  return response.json();
}

export async function getUser(selectedUserId: number): Promise<User> {
  const response = await fetch(`${URL}/users/${selectedUserId}`);

  const user = await response.json();

  return user;
}
