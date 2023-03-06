import { SelectedStatus } from '../types/SelectedStatus';
import { Todo } from '../types/Todo';

export const filterTodos = (
  todos: Todo[],
  selectedStatus: SelectedStatus,
  searchQuery: string,
) => {
  const queryToLowerCase = searchQuery.toLowerCase();

  let todosToShow = todos.filter(todo => {
    switch (selectedStatus) {
      case SelectedStatus.ALL:
        return true;
      case SelectedStatus.ACTIVE:
        return !todo.completed;
      case SelectedStatus.COMPLETED:
        return todo.completed;
      default:
        return true;
    }
  });

  if (searchQuery) {
    todosToShow = todosToShow
      .filter(todo => todo.title.toLowerCase().includes(queryToLowerCase));
  }

  return todosToShow;
};
