import { Todo } from '../types/Todo';

export enum Statuses {
  All = 'All',
  active = 'active',
  completed = 'completed',
}

export const filterTodos = (
  todos: Todo[],
  selectedFilter: Statuses,
  searchTerm: string,
): Todo[] => {
  let filtered = todos;

  switch (selectedFilter) {
    case Statuses.All:
      break;

    case Statuses.active:
      filtered = todos.filter(todo => !todo.completed);
      break;

    case Statuses.completed:
      filtered = todos.filter(todo => todo.completed);
      break;

    default:
      break;
  }

  if (searchTerm) {
    filtered = filtered.filter(todo =>
      todo.title.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }

  return filtered;
};
