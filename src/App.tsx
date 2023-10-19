/* eslint-disable no-console */
import React, { useCallback, useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { Todo } from './types/Todo';
import { getTodos } from './api';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';

// import { TodoModal } from './components/TodoModal';

import { Loader } from './components/Loader';
import { debounce } from './_utils/debounce_generic';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>(todos);

  const [loading, setLoading] = useState(false);

  const loadTodos = async () => {
    setLoading(true);

    try {
      const loadedTodos = await getTodos();

      setTodos(loadedTodos);
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  console.log(todos, 'normal');

  const handleFilter = useCallback((term: string) => {
    const debouncedFilter = debounce((bouncedTerm: string) => {
      if (bouncedTerm.trim() === '') {
        setFilteredTodos(todos);
      } else {
        const newFilteredTodos = todos.filter(
          todo => todo.title.includes(bouncedTerm),
        );

        setFilteredTodos(newFilteredTodos);
      }
    }, 300);

    debouncedFilter(term);
  }, [todos]);

  useEffect(() => {
    setFilteredTodos(todos);
  }, [todos]);

  console.log(filteredTodos, 'filtered');

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter onFilter={handleFilter} />
            </div>

            <div className="block">
              {loading && (
                <Loader />
              )}

              <TodoList
                todos={filteredTodos}
              />
            </div>
          </div>
        </div>
      </div>

      {/* <TodoModal /> */}
    </>
  );
};
