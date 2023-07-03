import { FilterTodos } from '../types/FilterTodos';
import { Todo } from '../types/Todo';

export const filter = (
  arr: Todo[],
  todoStatus: FilterTodos,
  query: string,
) => {
  return arr.filter(todo => {
    switch (todoStatus) {
      case FilterTodos.ACTIVE:
        return !todo.completed && todo.title.toLowerCase().includes(query);

      case FilterTodos.COMPLETED:
        return todo.completed && todo.title.toLowerCase().includes(query);

      case FilterTodos.ALL:
        return todo.title.toLowerCase().includes(query);

      default:
        return null;
    }
  });
};
