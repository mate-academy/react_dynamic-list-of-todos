import { Status } from '../types/Status';
import { Todo } from '../types/Todo';

export const getFilteredTodos = (
  todos: Todo[],
  query: string,
  status: Status,
): Todo[] => {
  const result = todos.filter(
    (todo: Todo) => todo.title.toLowerCase().indexOf(query.toLowerCase()) >= 0,
  );

  switch (status) {
    case 'active':
      return result.filter((todo: Todo) => !todo.completed);

    case 'completed':
      return result.filter((todo: Todo) => todo.completed);
    default:
      return result;
  }
};
