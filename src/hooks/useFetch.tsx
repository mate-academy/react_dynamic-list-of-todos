import { useEffect, useState } from 'react';

type Props<T> = {
  fun: () => Promise<T>;
};

type UseFetchReturn<T> = {
  data: T | null;
  loading: boolean;
  error: boolean;
};
export function useFetch<T>({ fun }: Props<T>): UseFetchReturn<T> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fun()
      .then(response => setData(response))
      .catch(() => setError(true))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { data, loading, error };
}
