import { useEffect, useCallback } from 'react';

import { Todo } from '../types/Todo';
import { getTodos } from '../api';

import { useAsync } from './useAsync';

const EMPTY_TODOS: Todo[] = [];

export function useTodos() {
  const { data, loading, error, execute, reset } = useAsync<Todo[]>();

  const loadTodos = useCallback(() => {
    execute(getTodos);
  }, [execute]);

  useEffect(() => {
    loadTodos();
  }, [loadTodos]);

  return {
    todos: data ?? EMPTY_TODOS,
    isLoading: loading,
    todosErrorMessage: error,
    resetTodosError: reset,
    loadTodos,
  };
}
