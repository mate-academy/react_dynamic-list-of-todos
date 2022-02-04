const API_URL = 'https://mate.academy/students-api';

export async function getTodos() {
  const result = await fetch(`${API_URL}/todos`);

  return result.json();
}

export async function getUser(userId: number) {
  const result = await fetch(`${API_URL}/users/${userId}`);

  return result.json();
}
