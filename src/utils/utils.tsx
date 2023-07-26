import { Todo } from '../types/Todo';
import { FilterType } from '../types/enum';

export function getPreperadTodos(
  todos: Todo[],
  filterBy: string,
  query: string,
) {
  let visibleTodos = [...todos];

  if (query) {
    const normalizeQuery = query.toLowerCase().trim();

    visibleTodos = visibleTodos.filter(todo => (
      todo.title.toLowerCase().includes(normalizeQuery)));
  }

  switch (filterBy) {
    case FilterType.All:
      return visibleTodos;

    case FilterType.Completed:
      return visibleTodos.filter(todo => todo.completed);

    case FilterType.Active:
      return visibleTodos.filter(todo => !todo.completed);

    default:
      return visibleTodos;
  }
}
