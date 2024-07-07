import { useEffect, useMemo, useState } from 'react';
import { Filter, Status, Todo } from '../types/Todo';
import { getTodos } from '../api';

export const useTodos = () => {
  const [filters, setFilters] = useState<Filter>({
    status: Status.all,
    query: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const filtered = useMemo(() => {
    const { status, query } = filters;

    let filteredTodos = todos;

    if (query) {
      filteredTodos = filteredTodos.filter(({ title }) =>
        title.toLowerCase().includes(query),
      );
    }

    switch (status) {
      case Status.active: {
        filteredTodos = filteredTodos.filter(({ completed }) => !completed);
        break;
      }

      case Status.completed: {
        filteredTodos = filteredTodos.filter(({ completed }) => completed);
        break;
      }
    }

    return filteredTodos;
  }, [todos, filters]);

  useEffect(() => {
    setIsLoading(true);

    getTodos()
      .then(response => setTodos(response))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const onChangeStatus = (status: Status) => {
    setFilters(prev => ({ ...prev, status }));
  };

  const onSearchByTitle = (value: string) => {
    setFilters(prev => ({ ...prev, query: value }));
  };

  const onSelectTodo = (todo: Todo | null) => {
    setSelectedTodo(todo);
  };

  return {
    todos: filtered,
    selectedTodo,
    isLoading,
    onChangeStatus,
    onSearchByTitle,
    onSelectTodo,
  };
};
