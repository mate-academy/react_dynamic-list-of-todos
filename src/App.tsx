import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';

import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { getFilteredTodos } from './helpers/getFilteredTodo';

export interface IQuery {
  status: string;
  query: string;
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setisLoading] = useState(false);
  const [query, setQuery] = useState({ status: 'all', query: '' });

  const filteredTodos = getFilteredTodos(todos, query);

  useEffect(() => {
    const getTodo = async () => {
      try {
        setisLoading(true);

        const res = await getTodos();

        setTodos(res);
      } catch (err) {
        if (err instanceof Error) {
          window.console.log(err.message);
        }
      } finally {
        setisLoading(false);
      }
    };

    getTodo();
  }, []);

  return (
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
  );
};
