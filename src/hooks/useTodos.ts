import { useEffect, useState } from 'react';

import { Todo } from '../types/Todo';
import { getTodos } from '../api';

export type SearchQueries = {
  searchInput: string,
  searchSelect: 'all' | 'completed' | 'active'
};

export const useTodos = (searchQueries: SearchQueries) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const loadTodos = async () => {
      setTodos(await getTodos());
    };

    loadTodos();
  }, []);

  const filterTodos = () => {
    const { searchInput, searchSelect } = searchQueries;
    let filteredTodos;

    switch (searchSelect) {
      case 'active':
        filteredTodos = todos.filter(({ completed }) => completed === false);
        break;
      case 'completed':
        filteredTodos = todos.filter(({ completed }) => completed === true);
        break;
      default:
        filteredTodos = todos;
    }

    return filteredTodos.filter(
      ({ title }) => title.toLowerCase().includes(searchInput.toLowerCase()),
    );
  };

  const filteredTodos = filterTodos();

  return filteredTodos;
};
