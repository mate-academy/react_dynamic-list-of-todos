import { useState, useEffect, useCallback } from 'react';
import { Todo, TodoFilterOptions } from '../types/Todo';
import { getTodos } from '../api';

type TodosHookTypes = (todosFilter: TodoFilterOptions) => [Todo[], boolean];

export const useTodos: TodosHookTypes = todosFilter => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isloading, setIsloading] = useState(false);

  const filterResponse = useCallback(
    (responseTodos: Todo[]) => {
      let filteredTodos = [...responseTodos];

      if (todosFilter.query !== '') {
        filteredTodos = responseTodos.filter(todo =>
          todo.title.toLowerCase().includes(todosFilter.query.toLowerCase()),
        );
        setTodos(filteredTodos);
      }

      if (todosFilter.select === 'completed') {
        filteredTodos = filteredTodos.filter(todo => todo.completed === true);
        setTodos(filteredTodos);
      } else if (todosFilter.select === 'active') {
        filteredTodos = filteredTodos.filter(todo => todo.completed === false);
        setTodos(filteredTodos);
      } else {
        setTodos(filteredTodos);
      }
    },
    [todosFilter.query, todosFilter.select],
  );

  useEffect(() => {
    getTodos()
      .then(response => filterResponse(response))
      .finally(() => setIsloading(true));
  }, [filterResponse]);

  return [todos, isloading];
};
