/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { IQuery } from './types/Filter';
import { getFilteredTodos } from './components/Filter/Filter';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState<IQuery>({ status: 'all', query: '' });

  useEffect(() => {
    const getTodo = async () => {
      try {
        setIsLoading(true);
        const res = await getTodos();

        setTodos(res);
      } catch (e) {
        window.console.log(e);
      } finally {
        setIsLoading(false);
      }
    };

    getTodo();
  }, []);

  const filteredTodos = getFilteredTodos(todos, query);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter setQuery={setQuery} />
            </div>

            {isLoading ? (
              <Loader />
            ) : (
              <div className="block">
                <TodoList todos={filteredTodos} />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
