import { Todo } from '../../types/Todo';
import { Status } from '../TodoFilter';

interface Filter {
  query: string;
  status: Status;
}

export const getFilteredTodos = (todos: Todo[], { query, status }: Filter) => {
  let filteredTodos = [...todos];
  const normalizedQuery = query.trim().toLowerCase();

  if (query !== '') {
    filteredTodos = filteredTodos.filter(todo =>
      todo.title.trim().toLowerCase().includes(normalizedQuery),
    );
  }

  if (status !== 'all') {
    filteredTodos = filteredTodos.filter(todo => {
      return status === 'completed' ? todo.completed : !todo.completed;
    });
  }

  return filteredTodos;
};
