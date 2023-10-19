import { Todo } from '../types/Todo';
import { Filter } from '../types/Filter';

export function filterAndSortTodos(
  text: string,
  opinion: Filter,
  originalTodos: Todo[],
) {
  const filteredTodo = originalTodos
    .filter((todo) => {
      if (opinion === Filter.Active) {
        return !todo.completed;
      }

      if (opinion === Filter.Comleted) {
        return todo.completed;
      }

      return true;
    })
    .filter((todo) => {
      return todo.title.toUpperCase().includes(text.toUpperCase().trim());
    });

  return filteredTodo;
}
