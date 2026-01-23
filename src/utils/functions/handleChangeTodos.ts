import { Todo } from '../../types/Todo';
import { normilizeQuery } from './normilizeQuery';

export function handleChangeTodos(
  todoList: Todo[],
  sortField: string,
  query: string,
): Todo[] {
  let result = [...todoList];

  if (sortField) {
    switch (sortField) {
      case 'all':
        result = [...todoList];
        break;

      case 'active':
        result = result.filter((todo: Todo) => todo.completed === false);
        break;

      case 'completed':
        result = result.filter((todo: Todo) => todo.completed === true);
        break;

      default:
        break;
    }
  }

  if (query) {
    const normalizedQuery = normilizeQuery(query);

    result = result.filter(todo =>
      todo.title.toLowerCase().includes(normalizedQuery),
    );
  }

  return result;
}
