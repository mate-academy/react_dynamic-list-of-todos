import { Todo } from '../types/Todo';
import { User } from '../types/User';

const API_TODOS_URL = 'https://mate.academy/students-api/todos';
const API_USERS_URL = 'https://mate.academy/students-api/users/';

export const getAllTodos = (): Promise<Todo[]> => {
  return fetch(API_TODOS_URL)
    .then(response => response.json());
};

export const getUserById = (id: number): Promise<User> => {
  return fetch(`${API_USERS_URL}${id}`)
    .then(response => response.json());
};
