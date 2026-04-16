import { useEffect, useState } from 'react';

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export function useFetchState<T, P extends any[] = undefined[]>(
  initialValue: T,
  fetchData: (...fetchParams: P) => Promise<T>,
  ...fetchParams: P
) {
  const [data, setData] = useState<T>(initialValue);
  const [fetchStatus, setFetchStatus] = useState({
    loading: true,
    errorText: '',
  });
  const [loadIteration, setLoadIteration] = useState(0);

  const fetchParamsString = JSON.stringify(fetchParams);

  function reload() {
    setLoadIteration(current => current + 1);
  }

  useEffect(() => {
    setFetchStatus({ errorText: '', loading: true });

    fetchData(...fetchParams)
      .then(fetchedData => {
        setData(fetchedData);
        setFetchStatus(current => ({ ...current, errorText: '' }));
      })
      .catch(error => {
        setFetchStatus(current => ({ ...current, errorText: error.message }));
      })
      .finally(() => {
        setFetchStatus(current => ({ ...current, loading: false }));
      });
  }, [setFetchStatus, fetchData, setData, loadIteration, fetchParamsString]); // eslint-disable-line

  return [data, setData, fetchStatus, reload] as const;
}
