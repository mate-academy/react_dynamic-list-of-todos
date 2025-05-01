import { useEffect, useState } from 'react';
import { getTodos } from '../api';
import { Todo } from '../types/Todo';

const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .finally(() => setIsLoading(false));
  }, []);

  return { todos, isLoading };
};

export default useTodos;
