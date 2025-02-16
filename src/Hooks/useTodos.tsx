import { useEffect, useState } from 'react';
import { Todo } from '../types/Todo';
import { getTodos } from '../api';

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .finally(() => setLoading(false));
  }, []);

  return { todos, isLoading: loading };
};
