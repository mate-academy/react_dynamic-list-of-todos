import { useEffect, useState } from 'react';
import { getTodos } from './api';
import { Todo } from './types/Todo';

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    getTodos()
      .then((data) => {
        setTodos(data);
        setIsLoading(false);
      });
  }, []);

  return { todos, isLoading };
};
