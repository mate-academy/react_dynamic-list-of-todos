import { useEffect, useCallback } from 'react';

import { User } from '../types/User';
import { Todo } from '../types/Todo';
import { getUser } from '../api';

import { useAsync } from './useAsync';

export function useUser(selectedTodo: Todo | null) {
  const { data, loading, error, execute, reset } = useAsync<User>();

  const fetchUser = useCallback(
    (userId: number) => {
      execute(() => getUser(userId));
    },
    [execute],
  );

  useEffect(() => {
    if (selectedTodo) {
      fetchUser(selectedTodo.userId);
    } else {
      reset();
    }
  }, [selectedTodo, fetchUser, reset]);

  return {
    user: data,
    isUserLoading: loading,
    userErrorMessage: error,
    loadUser: () => selectedTodo && fetchUser(selectedTodo.userId),
  };
}
