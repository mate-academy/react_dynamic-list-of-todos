import { Selection } from '../types/Selection';
import { Todo } from '../types/Todo';

export const getFilteredTodos = (
  todos: Todo[],
  selectionType: Selection,
  query: string,
) => {
  const filteredTodos = todos.filter((todo: Todo) => {
    switch (selectionType) {
      case Selection.completed:
        return todo.completed;

      case Selection.active:
        return !todo.completed;

      default:
        return todo;
    }
  });

  if (query) {
    return filteredTodos;
  }

  const formattedQuery = query
    .toLowerCase()
    .replace(/\s{2,}/, ' ');

  return filteredTodos.filter(todo => todo.title.includes(formattedQuery));
};
