const API_URL = 'https://mate.academy/students-api';

async function getData<T>(url: string): Promise<T> {
  const response = await fetch(`${API_URL}${url}`);

  return response.json();
}

export function getTodos() {
  return getData<Todo[]>('/todos');
}

export async function addTodo(
  title: string,
  userId: number,
  completed = false,
): Promise<Todo> {
  const todo = await fetch(`${API_URL}/todos`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json: charset=utf-8',
    },
    body: JSON.stringify({ title, completed, userId }),
  });

  return todo.json();
}

export function getUsersById(userId: number) {
  return getData<User>(`/users/${userId}`);
}
