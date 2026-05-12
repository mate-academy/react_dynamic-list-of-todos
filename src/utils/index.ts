import { TodoFiltersState } from '../App';
import { Todo } from '../types/Todo';

export function filteredTodos(
  todos: Todo[] | null,
  { status, search }: TodoFiltersState,
) {
  if (!todos) {
    return todos;
  }

  const preparedSearch = search.trim().toLowerCase();
  let copyTodos = [...todos];

  if (status !== 'all') {
    copyTodos = copyTodos.filter(todo => {
      if (status === 'completed') {
        return todo.completed;
      }

      return !todo.completed;
    });
  }

  if (preparedSearch) {
    copyTodos = copyTodos.filter(todo => {
      return todo.title.toLowerCase().includes(preparedSearch);
    });
  }

  return copyTodos;
}
