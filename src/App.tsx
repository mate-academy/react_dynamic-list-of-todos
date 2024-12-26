/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [showTodos, setShowTodos] = useState('all');
  const [query, setQuery] = useState('');
  const [modButton, setModButton] = useState<Todo | null>(null);

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then(items => {
        setTodos(items);
      })
      .finally(() => setLoading(false));
  }, []);

  const handlerSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setShowTodos(e.target.value);
  };

  const handlerInput = (e: React.ChangeEvent<HTMLInputElement> | string) => {
    if (typeof e === 'string') {
      setQuery('');
    } else {
      setQuery(e.target.value);
    }
  };

  const handlerModButton = (todo: Todo | null) => {
    setModButton(todo);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                handlerSelect={handlerSelect}
                handlerInput={handlerInput}
                query={query}
              />
            </div>

            <div className="block">
              {loading && <Loader />}
              {!loading && todos.length > 0 && (
                <TodoList
                  todos={todos}
                  select={showTodos}
                  query={query}
                  handlerModButton={handlerModButton}
                  modButton={modButton}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {modButton && (
        <TodoModal todo={modButton} handlerModButton={handlerModButton} />
      )}
    </>
  );
};
