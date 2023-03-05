import { Todo } from '../types/Todo';
import { FilterType } from '../types/FilterType';

export function getFilteredTodos(
  todos: Todo[],
  filterType: FilterType,
  query: string,
) {
  let visibleTodos = [...todos];

  switch (filterType) {
    case FilterType.ACTIVE:
      visibleTodos = visibleTodos.filter(todo => !todo.completed);
      break;

    case FilterType.COMPLETED:
      visibleTodos = visibleTodos.filter(todo => todo.completed);
      break;

    case FilterType.ALL:
    default:
      break;
  }

  return visibleTodos.filter(todo => (
    todo.title.toLowerCase().includes(query.toLowerCase())
  ));
}
