import { StatusFilter } from './types/StatusFilter';
import { Todo } from './types/Todo';

export const filterTodos = (
  todosFromServer: Todo[],
  selectedFilter: string = StatusFilter.All,
  searchQuery?: string,
) => {
  let todos = todosFromServer;
  const { Active, Completed } = StatusFilter;

  if (selectedFilter) {
    switch (selectedFilter) {
      case Active:
        todos = todos.filter(todo => !todo.completed);
        break;

      case Completed:
        todos = todos.filter(todo => todo.completed);
        break;

      default:
        todos = todosFromServer;
        break;
    }
  }

  if (searchQuery) {
    const currentQuery = searchQuery.toLowerCase();

    todos = todos.filter(todo => todo.title
      .toLowerCase().includes(currentQuery));
  }

  return todos;
};
