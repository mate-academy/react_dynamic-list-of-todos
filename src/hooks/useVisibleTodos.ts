import { useMemo } from 'react';

import { TodoFilterType } from '../types/TodoFilter';

import { Todo } from '../types/Todo';

import { filterTodos } from '../features/todos/filterTodos';

export function useVisibleTodos(
  todos: Todo[],
  todoFilter: TodoFilterType,
  query: string,
) {
  return useMemo(() => {
    return filterTodos(todos, todoFilter, query);
  }, [todos, todoFilter, query]);
}
