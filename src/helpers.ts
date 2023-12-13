import { Select } from './types/Select';
import { Todo } from './types/Todo';

export function preperedTodos(
  todos: Todo[],
  query: string,
  selectFilter: Select,
): Todo[] {
  let filteredTodo = [...todos];

  if (query) {
    filteredTodo = filteredTodo.filter(todo => {
      const titleLCase = todo.title.toLowerCase();
      const queryLCase = query.toLowerCase();

      return titleLCase.includes(queryLCase.trim());
    });
  }

  if (selectFilter) {
    switch (selectFilter) {
      case (Select.ACTIVE):
        filteredTodo = filteredTodo.filter(todo => !todo.completed);
        break;

      case (Select.COMPLETED):
        filteredTodo = filteredTodo.filter(todo => todo.completed);
        break;

      default:
        return filteredTodo;
    }
  }

  return filteredTodo;
}
