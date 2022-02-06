const url = 'https://mate.academy/students-api';

export async function getAllTodos(): Promise<Todo[]> {
  const response = await fetch(`${url}/todos`);

  return response.json();
}

export async function getUserById(id: number): Promise<User> {
  const response = await fetch(`${url}/users/${id}`);

  return response.json();
}
