/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos, getUser } from './api';
import { User } from './types/User';

export const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [modalLoading, setModalLoading] = useState(true);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const [activeTodo, setActiveTodo] = useState<Todo | null>(null);
  const [activeUser, setActiveUser] = useState<User | null>(null);

  useEffect(() => {
    setLoading(true);

    getTodos()
      .then(setTodos)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    setVisibleTodos(
      todos.filter(t => t.title.toLowerCase().includes(query.toLowerCase())),
    );
  }, [todos, query]);

  useEffect(() => {
    if (activeTodo) {
      setModalLoading(true);

      getUser(activeTodo.userId)
        .then(setActiveUser)
        .finally(() => setModalLoading(false));
    }
  }, [activeTodo]);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    switch (event.target.value) {
      case 'active':
        getTodos().then(ts => setTodos(ts.filter(t => !t.completed)));
        break;
      case 'completed':
        getTodos().then(ts => setTodos(ts.filter(t => t.completed)));
        break;
      default:
        getTodos().then(setTodos);
        break;
    }
  };

  const restoreTodos = () => {
    setLoading(true);

    getTodos()
      .then(setTodos)
      .finally(() => setLoading(false));
  };

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
                handleInput={handleInput}
                handleSelect={handleSelect}
                restoreTodos={restoreTodos}
              />
            </div>

            <div className="block">
              {loading && <Loader />}
              {visibleTodos && !loading && (
                <TodoList
                  todos={visibleTodos}
                  setActiveTodo={setActiveTodo}
                  activeTodo={activeTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {activeTodo && (
        <TodoModal
          activeTodo={activeTodo}
          setActiveTodo={setActiveTodo}
          isLoading={modalLoading}
          user={activeUser}
        />
      )}
    </>
  );
};
