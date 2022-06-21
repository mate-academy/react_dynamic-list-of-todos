import { Todo, User } from '../react-app-env';

const URL = 'https://mate.academy/students-api';

export async function getToDo(): Promise<Todo[]> {
  const promis = await fetch(`${URL}/todos`);

  const result = await promis.json();

  return result;
}

export async function findeUsers(userId: number): Promise<User> {
  const promis = await fetch(`${URL}/users/${userId}`);

  const result = promis.json();

  return result;
}
