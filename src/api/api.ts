import { TodoType } from '../types/TodoType';
import { UserType } from '../types/UserType';

const BASE_URL = 'https://mate.academy/students-api';

export async function getTodosFromServer(): Promise<TodoType[]> {
  const response = await fetch(`${BASE_URL}/todos`);

  return response.json();
}

export async function findUser(userId: number): Promise<UserType> {
  const response = await fetch(`https://mate.academy/students-api/users/${userId}`);

  const result = await response.json();

  return result;
}
