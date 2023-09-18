import { getTodos } from '../api';
import { Todo } from '../types/Todo';

export enum FilterType {
  ALL = 'all',
  ACTIVE = 'active',
  COMPLETED = 'completed',
}

export async function filterTodos(
  filterType: FilterType,
  query: string,
) {
  let todosFromServer = await getTodos();

  switch (filterType) {
    case FilterType.ALL:
      break;
    case FilterType.ACTIVE:
      todosFromServer = todosFromServer.filter((todo: Todo) => !todo.completed);
      break;

    case FilterType.COMPLETED:
      todosFromServer = todosFromServer.filter((todo: Todo) => todo.completed);
      break;
    default: break;
  }

  if (query.length > 0) {
    todosFromServer = todosFromServer
      .filter((todo: Todo) => todo.title.toLowerCase().includes(query));
  }

  return todosFromServer;
}
