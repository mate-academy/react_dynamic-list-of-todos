import { FilterState } from './components/TodoFilter';
import { Todo } from './types/Todo';

export function filterTodos(
  filterState: FilterState,
  serchQuvery: string,
  todos?: Todo[],
) {
  let resTodos = todos;

  if (filterState !== FilterState.All) {
    resTodos = resTodos?.filter(
      todo =>
        (filterState === FilterState.Completed && todo.completed) ||
        (filterState === FilterState.Active && !todo.completed),
    );
  }

  if (serchQuvery) {
    resTodos = resTodos?.filter(todo =>
      todo.title.toLowerCase().includes(serchQuvery.toLocaleLowerCase()),
    );
  }

  return resTodos;
}
