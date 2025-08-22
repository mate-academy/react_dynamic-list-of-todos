import { useEffect, useState } from 'react';
import { Errors } from '../types/types';

export function useFetch<T>(
  callback: () => Promise<T>,
): [T | null, boolean, string] {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    setErrorMessage('');
    setIsLoading(true);
    callback()
      .then((res: T) => {
        setData(res);
      })
      .catch((error: unknown) => {
        if (error instanceof Error) {
          setErrorMessage(error.message);
        } else {
          setErrorMessage(Errors.todo);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [callback]);

  return [data, isLoading, errorMessage];
}
