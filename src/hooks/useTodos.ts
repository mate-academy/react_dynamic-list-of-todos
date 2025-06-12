import { useEffect, useState } from 'react';
import { Todo } from '../types/Todo';
import { getTodos } from '../api';

export function useTodos() {
  const [data, setData] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTodos()
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  return { data, loading } as const;
}
