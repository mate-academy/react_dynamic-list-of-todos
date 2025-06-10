import { useState, useEffect } from 'react';
import { Todo } from '../types/Todo';
import { getTodos } from '../api';

export function useTodos() {
  const [data, setData] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getTodos()
      .then(setData)
      .finally(() => setIsLoading(false));
  }, []);

  return { data, isLoading } as const;
}
