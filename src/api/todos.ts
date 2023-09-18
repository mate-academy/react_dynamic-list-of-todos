import { Todo } from '../types/Todo';

const API_URL
  = 'https://mate-academy.github.io/react_dynamic-list-of-todos/api/todos.json';

export function getAllTodos(): Promise<Todo[]> {
  return fetch(API_URL)
    .then(responce => {
      return responce.json();
    });
}
