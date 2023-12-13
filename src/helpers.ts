import { SelectorOption } from './enum';
import { Todo } from './types/Todo';

export function getFilteredTodos(
  todos: Todo[],
  selector?: string,
  searchQuery?: string,
) {
  const preparedSearchQuery = searchQuery?.toLowerCase().trim();

  const todosFilteredBySelector = todos.filter(todo => {
    switch (selector) {
      case SelectorOption.Completed:
        return todo.completed;

      case SelectorOption.Active:
        return !todo.completed;

      default:
        return true;
    }
  });

  if (preparedSearchQuery && todosFilteredBySelector) {
    return todosFilteredBySelector.filter(todo => (
      todo.title.toLowerCase().includes(preparedSearchQuery)
    ));
  }

  return todosFilteredBySelector;
}
