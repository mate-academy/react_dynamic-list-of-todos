import { TodoListType } from '../types/TodoListType';
import { UserType } from '../types/UserType';

const baseURL = 'https://mate.academy/students-api/';

const usersDataURL = 'https://mate.academy/students-api/users/';

const request = (): Promise<TodoListType[]> => fetch(`${baseURL}todos`).then(response => response.json());

const requestToUsersData = (id: number): Promise<UserType> => fetch(`${usersDataURL}${id}`).then(response => response.json());

export async function prepairingData() {
  const todos = await request();

  return todos;
}

export async function preparedUser(id: number) {

  const User = await requestToUsersData(id);

  return User;
}
