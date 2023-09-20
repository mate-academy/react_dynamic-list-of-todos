import { useEffect, useState } from 'react';
import { Todo } from './types/Todo';
import { getTodos } from './api';

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getTodos().then((data) => {
      setTodos(data);
      setIsLoading(false);
    });
  }, []);

  return { todos, isLoading };
};
