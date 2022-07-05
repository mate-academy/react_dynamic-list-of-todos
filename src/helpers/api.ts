const BASE_URL = 'https://mate.academy/students-api';

export async function getTodos(): Promise<Todo[]> {
  const response = fetch(`${BASE_URL}/todos`);
  const todos = (await response).json();

  return todos;
}

// remember to handle errors

export async function getUser(userId: number): Promise<User> {
  const response = await fetch(`${BASE_URL}/user/${userId}`);
  const user = (await response).json();

  return user;
}
