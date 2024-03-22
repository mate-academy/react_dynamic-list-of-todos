import { Todo } from '../types/Todo';

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
      case 'active':
        visibleTodos = visibleTodos.filter(todo => todo.completed === false);
        break;
      case 'completed':
        visibleTodos = visibleTodos.filter(todo => todo.completed === true);
        break;
    }
  }

  return visibleTodos;
};
