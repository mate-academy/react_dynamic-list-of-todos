import { useState, useEffect } from 'react';

import { Todo } from '../types/Todo';
import { getTodos } from '../api';

export const useTodos = (): [Todo[], boolean] => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loadingTodos, setLoadingTodos] = useState(true);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .finally(() => setLoadingTodos(false));
  }, []);

  return [todos, loadingTodos];
};
