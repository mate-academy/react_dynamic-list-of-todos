import { Todo, User } from './types';

const todosUrl = 'https://mate.academy/students-api/todos';
const UsersUrl = 'https://mate.academy/students-api/users/';

export const getTodos = (): Promise<Todo[]> => {
  return fetch(todosUrl)
    .then(response => response.json());
};

const wait = (delay:number) => {
  return new Promise(resolve => setTimeout(resolve, delay));
};

export const getUser = async (userId:number): Promise<User> => {
  await wait(2000);

  return fetch(`${UsersUrl}${userId}`).then(response => response.json());
};
