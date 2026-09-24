import { Todo, TodoStatus } from '../types/Todo';

type FilterProps = {
  todos: Todo[];
  status: TodoStatus;
  query: string;
};

export function getFilteredTodos({
  todos,
  status,
  query,
}: FilterProps): Todo[] {
  let filteredTodos = todos;

  switch (status) {
    case 'all':
      filteredTodos = todos;
      break;
    case 'active':
      filteredTodos = todos.filter(todo => !todo.completed);
      break;
    case 'completed':
      filteredTodos = todos.filter(todo => todo.completed);
      break;
    default:
      return todos;
  }

  const filterByQuery = filteredTodos.filter(todo =>
    todo.title.trim().toLowerCase().includes(query.trim().toLowerCase()),
  );

  return filterByQuery;
}
