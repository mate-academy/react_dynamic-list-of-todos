import { useCallback, useState, useRef } from 'react';

type AsyncState<T> = {
  data: T | null;
  loading: boolean;
  error: string;
};

type AsyncResult<T> = {
  data: T | null;
  error?: string;
};

export function useAsync<T>() {
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    loading: false,
    error: '',
  });

  const lastRequestId = useRef(0);

  const finishRequest = useCallback(({ data, error = '' }: AsyncResult<T>) => {
    setState({
      data,
      loading: false,
      error,
    });
  }, []);

  const execute = useCallback(
    async (callback: () => Promise<T>) => {
      const currentRequestId = ++lastRequestId.current;

      const isLatestRequest = () => currentRequestId === lastRequestId.current;

      setState(prev => ({
        ...prev,
        loading: true,
        error: '',
      }));

      try {
        const data = await callback();

        if (!isLatestRequest()) {
          return null;
        }

        finishRequest({ data });

        return data;
      } catch (error) {
        if (!isLatestRequest()) {
          return null;
        }

        finishRequest({ data: null, error: String(error) });

        return null;
      }
    },
    [finishRequest],
  );

  const reset = useCallback(() => {
    lastRequestId.current++;
    finishRequest({ data: null });
  }, [finishRequest]);

  return {
    ...state,
    execute,
    reset,
  };
}
