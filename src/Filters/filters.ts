import { Todo } from '../types/Todo';
import { TodoStatus } from '../types/TodoStatus';

export const filterAndSearchTodos = (
  todos: Todo[],
  filterStatus: string,
  searchQuery: string,
): Todo[] => {
  let tempTodos = [...todos];

  switch (filterStatus) {
    case TodoStatus.Active:
      tempTodos = tempTodos.filter(todo => !todo.completed);
      break;
    case TodoStatus.Completed:
      tempTodos = tempTodos.filter(todo => todo.completed);
      break;
    default:
      break;
  }

  if (searchQuery) {
    tempTodos = tempTodos.filter(todo => todo.title
      .toLowerCase().includes(searchQuery.toLowerCase()));
  }

  return tempTodos;
};
