import { Filter } from '../types/Filter';
import { Todo } from '../types/Todo';

export const filterTodo = (
  todos: Todo[],
  searchQuery: string,
  filter: Filter | string,
): Todo[] => {
  let visibleTodos = todos;

  if (searchQuery) {
    visibleTodos = visibleTodos.filter(
      todo => todo.title.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }

  if (filter) {
    switch (filter) {
      case Filter.all: {
        break;
      }

      case Filter.active: {
        visibleTodos = visibleTodos.filter(todo => todo.completed === false);
        break;
      }

      case Filter.completed: {
        visibleTodos = visibleTodos.filter(todo => todo.completed === true);
        break;
      }

      default:
        break;
    }
  }

  return visibleTodos;
};
