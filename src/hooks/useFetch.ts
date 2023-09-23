import { useEffect, useState } from 'react';

export const useFetch = <T>(callback:() => Promise<T>) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [dataCollection, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await callback();

        setData(response);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    setIsLoading(true);
    fetchData();
  }, []);

  return { isLoading, dataCollection, error };
};
