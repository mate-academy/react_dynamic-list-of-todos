const API_URL = 'https://mate.academy/students-api';

export async function getData<T>(url: string): Promise<T> {
  const todos = await fetch(`${API_URL}${url}`);

  return todos.json();
}

export function getTodosFromServer() {
  return getData<Todo[]>('/todos');
}

export function getUserFromServer(userId: number) {
  return getData<User>(`/users/${userId}`);
}

export function getTodosByStatus(status: string) {
  return getData<Todo[]>(`/todos?completed=${status}`);
}
