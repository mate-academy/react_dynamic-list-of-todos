import { Todo } from '../types/Todo';
import { FilterValue, TodosFilter } from '../types/TodoFilter';

export const filterByStatus = (todos: Todo[], status: FilterValue): Todo[] => {
  if (status === TodosFilter.ALL) {
    return todos;
  }

  return todos.filter(todo =>
    status === TodosFilter.COMPLETED ? todo.completed : !todo.completed,
  );
};

export const filterByQuery = (todos: Todo[], query: string): Todo[] => {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return todos;
  }

  return todos.filter(todo =>
    todo.title.toLowerCase().includes(normalizedQuery),
  );
};
