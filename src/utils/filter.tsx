import { Todo } from '../types/Todo';

export enum FilterType {
  All = 'All',
  Active = 'Active',
  Completed = 'Completed',
}

export function filterTodos(
  todos: Todo[],
  filterType: FilterType,
  query: string,
) {
  let todosFromServer = [...todos];

  switch (filterType) {
    case FilterType.All:
      break;
    case FilterType.Active:
      todosFromServer = todosFromServer.filter((todo: Todo) => !todo.completed);
      break;

    case FilterType.Completed:
      todosFromServer = todosFromServer.filter((todo: Todo) => todo.completed);
      break;
    default: break;
  }

  if (query) {
    todosFromServer = todosFromServer
      .filter((todo: Todo) => todo.title.toLowerCase().includes(query));
  }

  return todosFromServer;
}
