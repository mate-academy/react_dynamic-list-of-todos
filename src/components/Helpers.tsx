import { FilterBy } from '../types/FilterBy';
import { Todo } from '../types/Todo';

export const filterTodos
= (initialTodos: Todo[], filter:string, query: string) => {
  const normalizedQuery = query.trim().toLowerCase();

  const filteredTodos = initialTodos.filter((todo: Todo) => {
    const matchesQuery = todo.title.toLowerCase().includes(normalizedQuery);

    switch (filter) {
      case FilterBy.Active:
        return !todo.completed && matchesQuery;

      case FilterBy.Completed:
        return todo.completed && matchesQuery;

      default:
        return matchesQuery;
    }
  });

  return filteredTodos;
};
