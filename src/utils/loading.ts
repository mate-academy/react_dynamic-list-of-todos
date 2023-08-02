import { useState, useEffect } from 'react';

export function useDataAfterDelay<T>(fetch: () => Promise<T>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch()
      .then((response) => setData(response))
      .catch(() => setError('Problems with loading todos. Try later.'))
      .finally(() => setLoading(false));
  }, [fetch]);

  return { data, loading, error };
}
