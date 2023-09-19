import { useEffect, useState } from 'react';

export const useFetch = <T>(callback:() => Promise<T>) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [dataCollection, setData] = useState<T | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await callback();

        setData(response);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { isLoading, dataCollection };
};
