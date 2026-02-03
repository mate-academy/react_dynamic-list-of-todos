// export function getTodos() {
//   return fetch('http://localhost:5174/api/todos.json').then(response => {
//     if (!response.ok) {
//     }

//     return response.json();
//   });
// }

import { Todo } from '../../types/Todo';

const TODOS_URL =
  'https://mate-academy.github.io/react_dynamic-list-of-todos/api/todos.json';

export function getTodos(): Promise<Todo[]> {
  return fetch(TODOS_URL).then(response => response.json());
}
