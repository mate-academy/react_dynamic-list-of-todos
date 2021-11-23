import { User } from '../types/User';

const BASE_URL = 'https://mate.academy/students-api/todos';
const USERS_URL = 'https://mate.academy/students-api/users';

export const request = async () => {
  const responce = await fetch(BASE_URL);

  if (!responce.ok) {
    throw new Error(`${responce.status} - ${responce.statusText}`);
  }

  return responce.json();
};

const getUsers = async () => {
  const responce = await fetch(USERS_URL);

  if (!responce.ok) {
    throw new Error(`${responce.status} - ${responce.statusText}`);
  }

  return responce.json();
};

export const getUserById = async (userId: number) => {
  const allUsers = await getUsers();

  return allUsers.find((user: User) => user.id === userId);
};
