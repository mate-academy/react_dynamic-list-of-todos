const API_URL = 'https://mate.academy/students-api/';

async function getBaseData(endpoint: string) {
  const data = await fetch(`${API_URL}${endpoint}`);

  if (data.ok && data.headers.get('content-type')?.includes('application/json')) {
    return data.json();
  }

  return null;
}

export async function getTodos(): Promise<Todo[]> {
  const todos = await getBaseData('todos');

  return todos;
}

export async function getUserById(id: number): Promise<User> {
  const user = await getBaseData(`users/${id}`);

  return user;
}
