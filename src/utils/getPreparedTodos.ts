import { Todo } from '../types/Todo';
import { FieldType } from '../types/enum';

type Params = {
  query: string;
  filterField: FieldType;
};

export const getPreparedTodos = (
  todos: Todo[],
  { query, filterField }: Params,
) => {
  const preparedTodos = [...todos];
  const normalizedQuery = query.trim().toLowerCase();

  return preparedTodos.filter(todo => {
    const matchesQuery = todo.title.toLowerCase().includes(normalizedQuery);

    switch (filterField) {
      case FieldType.active:
        return matchesQuery && !todo.completed;
      case FieldType.completed:
        return matchesQuery && todo.completed;
      case FieldType.all:
      default:
        return matchesQuery;
    }
  });
};
