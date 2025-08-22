import { useEffect, useState } from 'react';
import { getTodos } from '../api';
import { Todo } from '../types/Todo';

export const useFetchData = () => {
  const [fetchedData, setFetchedData] = useState<Todo[]>([]);
  const [renderedData, setRenderedData] = useState<Todo[]>([]);
  const [fetchError, setFetchError] = useState<string>('');
  const [isLoader, setIsLoader] = useState<boolean>(false);

  useEffect(() => {
    setIsLoader(true);
    getTodos()
      .then(data => {
        setFetchedData(data);
        setRenderedData(data);
        setIsLoader(false);
      })
      .catch(() => setFetchError('Try again later'));
  }, []);

  return {
    fetchedData,
    setFetchedData,
    renderedData,
    setRenderedData,
    fetchError,
    setFetchError,
    isLoader,
    setIsLoader,
  };
};
