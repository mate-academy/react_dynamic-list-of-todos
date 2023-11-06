import { Filters } from './types/Filters';
import { Todo } from './types/Todo';

export const filter = (
  todos: Todo[],
  filterBy: Filters,
  query: string,
) => {
  let fiteredTodos = [...todos];

  switch (filterBy) {
    case 'active':
      fiteredTodos = todos.filter(todo => !todo.completed);
      break;

    case 'completed':
      fiteredTodos = todos.filter(todo => todo.completed);
      break;

    default:
      break;
  }

  if (query) {
    fiteredTodos = fiteredTodos
      .filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()));
  }

  return fiteredTodos;
};
