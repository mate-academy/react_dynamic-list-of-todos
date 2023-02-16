import { SelectValue } from '../types/SelectValue';
import { Todo } from '../types/Todo';

export const getVisibleTodos = (
  todos: Todo[],
  select: string,
  query: string,
): Todo[] => {
  let visibleTodos = [...todos];

  switch (select) {
    case SelectValue.ACTIVE:
      visibleTodos = visibleTodos.filter(todo => !todo.completed);
      break;
    case SelectValue.COMPLETED:
      visibleTodos = visibleTodos.filter(todo => todo.completed);
      break;
    case SelectValue.ALL:
    default:
      visibleTodos = [...todos];
  }

  if (query) {
    visibleTodos = visibleTodos.filter(
      ({ title }) => title.toLowerCase().includes(query.toLowerCase()),
    );
  }

  return visibleTodos;
};
