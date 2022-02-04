const API_URL = 'https://mate.academy/students-api';

async function getData<T>(url: string): Promise<T> {
  const response = await fetch(`${API_URL}${url}`);

  return response.json();
}

export function getTodos() {
  return getData<Todo[]>('/todos');
}

export function getUser(userId: number) {
  return getData<User>(`/users/${userId}`);
}
