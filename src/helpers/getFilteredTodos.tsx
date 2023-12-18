import { TodoStatus } from '../types/TodoStatus';
import { Todo } from '../types/Todo';

export function getFilteredTodos(
  todos: Todo[],
  selectedFilter: TodoStatus,
  lowerCaseQuery: string,
) {
  return todos
    .filter(todo => {
      switch (selectedFilter) {
        case TodoStatus.Active:
          return !todo.completed;
        case TodoStatus.Completed:
          return todo.completed;
        default:
          return true;
      }
    })
    .filter(todo => (
      todo.title.toLowerCase().includes(lowerCaseQuery)
    ));
}
