import { FilterBy } from './types/FilterBy';
import { Todo } from './types/Todo';

export function filterTodos(todos: Todo[], filterBy: FilterBy, query: string) {
  let filteredTodos = [...todos];

  if (query) {
    filteredTodos = filteredTodos.filter(todo => (
      todo.title.toLowerCase().trim().includes(query.toLowerCase().trim())
    ));
  }

  switch (filterBy) {
    case FilterBy.ACTIVE:
      return filteredTodos.filter(todo => !todo.completed);

    case FilterBy.COMPLETED:
      return filteredTodos.filter(todo => todo.completed);

    default:
      return filteredTodos;
  }
}
