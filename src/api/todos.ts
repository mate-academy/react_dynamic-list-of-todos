import { Todo } from '../types/Todo';

const API_URL_TODOS = `https://mate-academy.github.io/react_dynamic-list-of-todos/api/todos.json`;

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export function getTodos(): Promise<Todo[]> {
  return delay(1000).then(() =>
    fetch(API_URL_TODOS).then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      return response.json();
    }),
  );
}
