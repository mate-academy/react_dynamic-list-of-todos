/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
// import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [isTodosLoad, setIsTodosLoad] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setTodos(await getTodos());
      setIsTodosLoad(true);
    };

    fetchData();
  }, []);

  const preparedTodos = useMemo(() => {
    return todos.filter(todo => {
      const regex = new RegExp(query.trim(), 'gi');

      return regex.test(todo.title);
    });
  }, [todos, query]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                setQuery={setQuery}
              />
            </div>

            <div className="block">
              {isTodosLoad
                ? <TodoList todos={preparedTodos} />
                : <Loader />}
            </div>
          </div>
        </div>
      </div>

      {/* <TodoModal /> */}
    </>
  );
};
