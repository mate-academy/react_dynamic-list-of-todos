import { Status } from '../components/TodoFilter';
import { Todo } from '../types/Todo';

interface FilterType {
  query: string;
  status: Status;
}

export const getFilteredTodos = (
  todos: Todo[],
  { query, status }: FilterType,
) => {
  let filteredTodos = [...todos];

  const normalizedQuery = query.trim().toLowerCase();

  if (normalizedQuery) {
    filteredTodos = filteredTodos.filter(todo => {
      const normalizedTodoTitle = todo.title.trim().toLowerCase();

      return normalizedTodoTitle.includes(normalizedQuery);
    });
  }

  if (status !== Status.ALL) {
    filteredTodos = filteredTodos.filter(todo => {
      return status === Status.COMPLETED ? todo.completed : !todo.completed;
    });
  }

  return filteredTodos;
};
