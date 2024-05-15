import { Todo } from '../types/Todo';

export const filterTodos = (
  filter: string,
  todos: Todo[],
  query: string,
): Todo[] => {
  let filteredTodos = todos;

  switch (filter) {
    case 'all':
      break;
    case 'active':
      filteredTodos = filteredTodos.filter(todo => !todo.completed);
      break;
    case 'completed':
      filteredTodos = filteredTodos.filter(todo => todo.completed);
      break;
    default:
      break;
  }

  if (query.trim() !== '') {
    filteredTodos = filteredTodos.filter(todo =>
      todo.title.toLowerCase().includes(query.toLowerCase()),
    );
  }

  return filteredTodos;
};
