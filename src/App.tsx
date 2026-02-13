/* eslint-disable max-len */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
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
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [loader, setLoader] = useState(false);
  const [status, setStatus] = useState<'all' | 'active' | 'completed'>('all');
  const [query, setQuery] = useState('');
  const [user, setUser] = useState<User>();
  const [modalLoader, setModalLoader] = useState(false);

  useEffect(() => {
    setLoader(true);
    getTodos()
      .then(setTodos)
      .finally(() => setLoader(false));
  }, []);

  useEffect(() => {
    if (!selectedTodo) {
      setUser(undefined);

      return;
    }

    getUser(selectedTodo.userId)
      .then(setUser)
      .finally(() => setModalLoader(false));
  }, [selectedTodo]);

  const filteredTodos = useCallback(
    (list: Todo[]) => {
      let result = [...list];

      if (status === 'active') {
        result = result.filter(t => !t.completed);
      } else if (status === 'completed') {
        result = result.filter(t => t.completed);
      }

      const q = query.trim().toLowerCase();

      if (q) {
        result = result.filter(t => t.title.toLowerCase().includes(q));
      }

      return result;
    },
    [status, query],
  );

  const visibleTodos = useMemo(() => {
    return filteredTodos(todos);
  }, [filteredTodos, todos]);

  const handleSelectedTodo = (todo: Todo) => {
    setSelectedTodo(todo);
    setModalLoader(true);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                status={status}
                setStatus={setStatus}
                query={query}
                setQuery={setQuery}
              />
            </div>

            <div className="block">
              {loader && <Loader />}
              {!loader && (
                <TodoList
                  todos={visibleTodos}
                  onSelect={handleSelectedTodo}
                  selected={selectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {selectedTodo && (
        <TodoModal
          user={user}
          todo={selectedTodo}
          loading={modalLoader}
          onClose={() => {
            setSelectedTodo(null);
            setModalLoader(false);
          }}
        />
      )}
    </>
  );
};
