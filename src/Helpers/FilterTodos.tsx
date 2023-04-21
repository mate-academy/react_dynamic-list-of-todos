import { Todo } from '../types/Todo';

export function filterTodos(
  todos: Todo[],
  filterType: string,
  query: string,
): Todo[] {
  const searchQuery = query.trim().toLowerCase();

  const filtered = todos.filter((todo) => {
    switch (filterType) {
      case 'active':
        return !todo.completed;

      case 'completed':
        return todo.completed;

      case 'all':
      default:
        return todo;
    }
  });

  return filtered
    .filter((todo) => todo.title.toLowerCase().includes(searchQuery));
}
