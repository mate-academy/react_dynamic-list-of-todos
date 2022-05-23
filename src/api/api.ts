const BASE_URL = 'https://mate.academy/students-api';

export async function getTodos() {
  const response = await fetch(`${BASE_URL}/todos`);

  return response.json();
}

export async function getUser(userId: number) {
  const response = await fetch(`${BASE_URL}/users/${userId}`);

  return response.json();
}
