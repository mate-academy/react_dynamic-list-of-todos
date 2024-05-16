import { Todo } from '../types/Todo';

export enum Filter {
  ALL = 'all',
  ACTIVE = 'active',
  COMPLETED = 'completed',
}

export const filterTodos = (
  filter: Filter,
  todos: Todo[],
  query: string,
): Todo[] => {
  let filteredTodos = todos;

  switch (filter) {
    case Filter.ALL:
      break;
    case Filter.ACTIVE:
      filteredTodos = filteredTodos.filter(todo => !todo.completed);
      break;
    case Filter.COMPLETED:
      filteredTodos = filteredTodos.filter(todo => todo.completed);
      break;
    default:
      break;
  }

  if (query.trim() !== '') {
    filteredTodos = filteredTodos.filter(todo =>
      todo.title.toLowerCase().includes(query.toLowerCase()),
    );
  }

  return filteredTodos;
};
