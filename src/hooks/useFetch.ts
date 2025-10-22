/* eslint-disable no-console */
import { useEffect, useState } from 'react';

export function useFetch<T>(callback: () => Promise<T>): [T | null, boolean] {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    callback()
      .then((res: T) => {
        setData(res);
      })
      .catch((error: unknown) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [callback]);

  return [data, isLoading];
}
