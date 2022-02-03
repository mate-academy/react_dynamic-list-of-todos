export async function getAll(): Promise<Todo[]> {
  const response = await fetch('https://mate.academy/students-api/todos');

  return response.json();
}

export async function getUserById(id: number): Promise<User> {
  const response = await fetch(`https://mate.academy/students-api/users/${id}`);

  return response.json();
}
