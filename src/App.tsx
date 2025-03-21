/* eslint-disable max-len */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo, TodoType } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Array<Todo>>([]);
  const [todo, setTodo] = useState<Todo | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [query, setQuery] = useState<string>('');
  const [filterType, setFilterType] = useState<TodoType>('all');

  const selectTodo = (selectedTodo: Todo) => {
    setTodo(selectedTodo);
  };

  const handleClose = useCallback(() => {
    setTodo(null);
  }, []);

  useEffect(() => {
    const getTodosList = async () => {
      setIsLoading(true);
      try {
        const result = await getTodos();

        setTodos(result);
      } catch (error) {
        setTodos([]);
      } finally {
        setIsLoading(false);
      }
    };

    getTodosList();
  }, []);

  const handleChangeType = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const { value } = event.target;

      setFilterType(value as TodoType);
    },
    [],
  );

  const handleChangeQuery = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;

      setQuery(value);
    },
    [],
  );

  const handleClearQuery = useCallback(() => {
    setQuery('');
  }, []);

  const filteredTodos = useMemo(() => {
    if (!query && filterType === 'all') {
      return todos;
    }

    return todos.filter(item => {
      const matchesQuery = item.title
        .toLowerCase()
        .includes(query.toLowerCase());

      if (filterType === 'all') {
        return matchesQuery;
      }

      if (filterType === 'completed') {
        return matchesQuery && item.completed;
      }

      if (filterType === 'active') {
        return matchesQuery && !item.completed;
      }

      return false;
    });
  }, [todos, query, filterType]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                handleChangeType={handleChangeType}
                handleChangeQuery={handleChangeQuery}
                handleClearQuery={handleClearQuery}
                query={query}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}
              {!isLoading && (
                <TodoList
                  todos={filteredTodos}
                  selectTodo={selectTodo}
                  selectedTodo={todo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {todo && <TodoModal todo={todo} handleClose={handleClose} />}
    </>
  );
};
