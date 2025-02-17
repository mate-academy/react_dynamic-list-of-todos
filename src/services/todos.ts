import { Todo } from '../types/Todo';
import { getData } from '../utils/httpClient';

// export function getAllTodos(): Promise<Todo[]> {
//   return getData<Todo[]>('/todos.json');
// }

// export function getActiveTodos(): Promise<Todo[]> {
//   return getData<Todo[]>('/todos.json').then(todos =>
//     todos.filter(todo => todo.completed === false),
//   );
// }

// export function getCompletedTodos(): Promise<Todo[]> {
//   return getData<Todo[]>('/todos.json').then(todos =>
//     todos.filter(todo => todo.completed === true),
//   );
// }

export function getTodos(
  status: string = 'all',
  query: string = '',
): Promise<Todo[]> {
  return getData<Todo[]>('/todos.json').then(todos => {
    const filteredByStatus =
      status === 'active'
        ? todos.filter(todo => !todo.completed)
        : status === 'completed'
          ? todos.filter(todo => todo.completed)
          : todos;

    return filteredByStatus.filter(todo =>
      todo.title.toLowerCase().includes(query.toLowerCase()),
    );
  });
}
