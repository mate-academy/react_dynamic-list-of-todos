import { Todo } from '../types/Todo';

export function getTodos(): Promise<Todo[]> {
  return fetch(
    'https://mate-academy.github.io/react_dynamic-list-of-todos/api/todos.json',
  ).then(res => {
    if (!res.ok) {
      throw new Error('Network response was not ok');
    }

    return res.json();
  });
}

export const getUserById = async (userId: number) => {
  return fetch(
    `https://mate-academy.github.io/react_dynamic-list-of-todos/api/users/${userId}.json`,
  ).then(res => {
    if (!res.ok) {
      throw new Error('Network response was not ok');
    }

    return res.json();
  });
};
