import { Todo } from './types/Todo';

export const getFilteretTodos = (todos: Todo[],
  searchQuery: string,
  status: string) => {
  let visibleTodos = todos;

  switch (status) {
    case 'active':
      visibleTodos = visibleTodos.filter(todo => !todo.completed);
      break;

    case 'completed':
      visibleTodos = visibleTodos.filter(todo => todo.completed);
      break;

    default:
      break;
  }

  if (searchQuery) {
    visibleTodos = visibleTodos
      .filter(todo => todo.title
        .toLowerCase().includes(searchQuery.toLowerCase()));
  }

  return visibleTodos;
};
