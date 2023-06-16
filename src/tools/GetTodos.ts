import { Todo } from '../types/Todo';
import { User } from '../types/User';

// eslint-disable-next-line
const API_TODOS = 'https://mate-academy.github.io/react_dynamic-list-of-todos/api/todos.json';
// eslint-disable-next-line
const API_USERS = 'https://mate-academy.github.io/react_dynamic-list-of-todos/api/users';

export function getTodos(): Promise<Todo[]> {
  return fetch(API_TODOS)
    .then(response => response.json());
}

export function getUserById(userId: number | undefined): Promise<User> {
  return fetch(`${API_USERS}/${userId}.json`)
    .then(response => response.json());
}

export const getTodo = async (todoId: number) => {
  const todo = await (await getTodos())
    .find(item => item.id === todoId) || null;

  return todo;
};
