import { Selection } from '../types/Selection';
import { Todo } from '../types/Todo';

export const getFilteredTodos = (
  todos: Todo[],
  selectedType: Selection,
  query: string,
) => {
  let filteredTodos;

  switch (selectedType) {
    case Selection.completed:
      filteredTodos = todos.filter(todo => todo.completed);
      break;

    case Selection.active:
      filteredTodos = todos.filter(todo => !todo.completed);
      break;

    default:
      filteredTodos = todos;
  }

  const formattedQuery = query
    .toLowerCase()
    .replace(/\s{2,}/, ' ');

  if (formattedQuery) {
    return filteredTodos.filter(todo => todo.title.includes(formattedQuery));
  }

  return filteredTodos;
};
