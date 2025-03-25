import { useEffect, useState } from 'react';

export function useFetch<T>(fetchFunc: () => Promise<T>, defaultValue: T) {
  const [data, setData] = useState<T>(defaultValue);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!fetchFunc) {
      setError('No fetch function provided');

      return;
    }

    setLoading(true);
    const fetchData = async () => {
      try {
        const result = await fetchFunc();

        setData(result);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'An unexpected error occurred',
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [fetchFunc]);

  return { data, loading, error };
}
