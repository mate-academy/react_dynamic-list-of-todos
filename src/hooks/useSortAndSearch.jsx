import { useMemo } from 'react';

export const useSortAndSearch = (todos, sort, query) => {
  const modifiedTodos = useMemo(() => {
    return (todos
      .filter(todo => {
        switch (sort) {
          case 'active':
            return !todo.completed;
          case 'completed':
            return todo.completed;
          default:
            return todo;
        }
      })
      .filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()))
    );
  }, [todos, sort, query]);

  return modifiedTodos;
};
