import { Todo } from '../../types/Todo';

import { SortType } from '../../types/SortType';

export function getReorderedTodos(
  todos: Todo[],
  sortType: SortType,
): Todo[] {
  const visibleTodos = [...todos];

  switch (sortType) {
    case SortType.Active:
      return visibleTodos.filter(todo => {
        return todo.completed === false;
      });

    case SortType.Completed:
      return visibleTodos.filter(todo => {
        return todo.completed === true;
      });

    default:
      return visibleTodos;
  }
}
