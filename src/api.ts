import { Todo, User } from './react-app-env';

export const getTodos: () => Promise<Todo[]> = () => {
  return fetch('https://mate.academy/students-api/todos')
    .then(response => response.json());
};

export const getUser: (userId: number) => Promise<User> = (userId) => {
  return fetch(`https://mate.academy/students-api/users/${userId}`)
    .then(response => response.json());
};
