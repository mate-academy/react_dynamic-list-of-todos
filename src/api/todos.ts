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

export async function addTodo(
  title: string,
  userId: number,
  completed = false,
) {
  const response = await fetch(`${API_URL}/todos`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify({ title, userId, completed }),
  });

  return response.json();
}

export function deleteTodo(todoId: number) {
  return fetch(`${API_URL}/todos/${todoId}`, {
    method: 'DELETE',
  });
}
