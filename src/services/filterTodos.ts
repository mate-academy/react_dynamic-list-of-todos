import { ProgressStatusOption } from '../types/ProgessStatusOptions';
import { Todo } from '../types/Todo';

export const filterTodos = (
  todos: Todo[],
  query: string = '',
  filterValue: ProgressStatusOption = 'all',
) => {
  const normalizedQuery = query.toLowerCase();

  return [...todos].filter(todo => {
    if (!todo.title.toLowerCase().includes(normalizedQuery)) {
      return false;
    }

    return (
      filterValue === 'all' || todo.completed === (filterValue === 'completed')
    );
  });
};
