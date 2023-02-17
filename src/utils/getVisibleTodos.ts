import { SelectValue } from '../types/SelectValue';
import { Todo } from '../types/Todo';

export const getVisibleTodos = (
  todos: Todo[],
  select: string,
  query: string,
): Todo[] => {
  let filteredTodos = todos.filter(todo => {
    switch (select) {
      case SelectValue.ACTIVE:
        return !todo.completed;

      case SelectValue.COMPLETED:
        return todo.completed;

      case SelectValue.ALL:
        return true;

      default:
        throw new Error('Invalid filter property');
    }
  });

  if (query) {
    filteredTodos = filteredTodos.filter(
      ({ title }) => title.toLowerCase().includes(query.toLowerCase()),
    );
  }

  return filteredTodos;
};
