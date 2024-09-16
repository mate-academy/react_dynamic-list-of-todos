import { Todo } from '../types/Todo';
import { Status } from '../types/status';

export const getPreparedTodos = (
  todos: Todo[],
  filterField: string,
  query: string,
) => {
  let visibleTodos = [...todos];

  if (query) {
    visibleTodos = visibleTodos.filter(todo =>
      todo.title.toLowerCase().includes(query.toLowerCase().trim()),
    );
  }

  if (filterField) {
    switch (filterField) {
      case Status.Active:
        visibleTodos = visibleTodos.filter(todo => !todo.completed);
        break;
      case Status.Completed:
        visibleTodos = visibleTodos.filter(todo => todo.completed);
        break;
    }
  }

  return visibleTodos;
};
