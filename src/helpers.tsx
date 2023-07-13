import { Todo } from './types/Todo';
import { TodoStatus } from './types/TodoStatus';

export const getFilteredTodos = (
  todos: Todo[],
  searchQuery: string,
  status: string,
) => {
  let visibleTodos = todos;

  if (status !== TodoStatus.ALL) {
    switch (status) {
      case TodoStatus.ACTIVE:
        visibleTodos = visibleTodos.filter(todo => !todo.completed);
        break;

      case TodoStatus.COMPLETED:
        visibleTodos = visibleTodos.filter(todo => todo.completed);
        break;

      default:
        break;
    }
  }

  if (searchQuery) {
    visibleTodos = visibleTodos
      .filter(todo => todo.title
        .toLowerCase().includes(searchQuery.toLowerCase()));
  }

  return visibleTodos;
};
