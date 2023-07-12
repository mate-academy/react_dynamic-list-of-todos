import { Todo } from './types/Todo';
import { TodoStatus } from './types/TodoStatus';

export const getFilteredTodos = (todos: Todo[],
  searchQuery: string,
  status: string) => {
  let visibleTodos = todos;

  if (status !== TodoStatus.all) {
    switch (status) {
      case TodoStatus.active:
        visibleTodos = visibleTodos.filter(todo => !todo.completed);
        break;

      case TodoStatus.completed:
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
