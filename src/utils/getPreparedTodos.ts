import { Todo } from '../types/Todo';

type QueryType = {
  searchQuery: string;
  completionQuery: string;
};

export const getPreparedTodos = (
  todos: Todo[],
  { searchQuery, completionQuery }: QueryType,
) => {
  let preparedTodos = [...todos];

  const normalizedSearchQuery = searchQuery.trim().toLowerCase();

  if (normalizedSearchQuery !== '') {
    preparedTodos = preparedTodos.filter(todo => {
      const normalizedTodo = todo.title.toLowerCase();

      return normalizedTodo.includes(normalizedSearchQuery);
    });
  }

  if (completionQuery !== 'all') {
    preparedTodos = preparedTodos.filter(todo => {
      switch (completionQuery) {
        case 'active':
          return !todo.completed;
        case 'completed':
          return todo.completed;
      }
    });
  }

  return preparedTodos;
};
