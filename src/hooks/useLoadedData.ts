import { useCallback, useState } from 'react';

interface ReturnedData<T> {
  data: T;
  isLoading: boolean;
  error: string;
  handleLoadData: (loadFn: () => Promise<T>) => void;
}

export function useLoadedData<T>(initialValue: T): ReturnedData<T> {
  const [data, setData] = useState<T>(initialValue);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLoadData = useCallback((loadFn: () => Promise<T>) => {
    setIsLoading(true);

    loadFn()
      .then((resData: T) => setData(resData))
      .catch((err: Error) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, []);

  return { data, isLoading, error, handleLoadData };
}
