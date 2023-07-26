import { Todo } from '../types/Todo';

export function getPreparedTodos(
  todoList: Todo[],
  filter: string,
  query: string,
) {
  let preparedTodos = [...todoList];

  if (query) {
    // eslint-disable-next-line
    preparedTodos = preparedTodos.filter(todo => todo.title.toLowerCase().includes(query.trim().toLowerCase()));
  }

  if (filter !== 'all') {
    switch (filter) {
      case 'all':
        preparedTodos = [...todoList];
        break;

      case 'active':
        preparedTodos = preparedTodos.filter(todo => !todo.completed);
        break;

      case 'completed':
        preparedTodos = preparedTodos.filter(todo => todo.completed);
        break;

      default:
        throw new Error('Error');
    }
  }

  return preparedTodos;
}
