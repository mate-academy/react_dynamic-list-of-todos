import { useState, useMemo } from 'react';
import { Todo } from '../../types/Todo';

export const useTodoFilter = (todos: Todo[]) => {
  const [filter, setFilter] = useState<string>('all');
  const [search, setSearch] = useState<string>('');

  const handleFilterChange = (filterOption: string) => {
    setFilter(filterOption);
  };

  const handleSearchChange = (searchString: string) => {
    setSearch(searchString);
  };

  const filteredTodos = useMemo(() => {
    return todos.filter(todo => {
      const matchesFilter =
        filter === 'all' ||
        (filter === 'active' && !todo.completed) ||
        (filter === 'completed' && todo.completed);

      const matchesSearch = todo.title
        .toLowerCase()
        .includes(search.toLowerCase());

      return matchesFilter && matchesSearch;
    });
  }, [todos, filter, search]);

  return {
    filter,
    search,
    filteredTodos,
    handleFilterChange,
    handleSearchChange,
  };
};
