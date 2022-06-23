import { User } from '../react-app-env';

const API_URL = 'https://mate.academy/students-api';

export async function getUserById(id: number): Promise<User> {
  const response = await fetch(`${API_URL}/users/${id}`);

  return response.json();
}
