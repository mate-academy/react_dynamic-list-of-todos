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
  const [loader, setLoader] = useState(true);
  const [isActive, setIsActive] = useState<number | null>(null);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<'all' | 'active' | 'completed'>('all');

  useEffect(() => {
    setLoader(true);
    getTodos()
      .then(data => setTodos(data))
      .finally(() => setLoader(false));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                setStatus={setStatus}
                setQuery={setQuery}
              />
            </div>

            <div className="block">
              {loader && <Loader />}
              <TodoList
                todos={todos}
                isActive={isActive}
                setIsActive={setIsActive}
                query={query}
                status={status}
              />
            </div>
          </div>
        </div>
      </div>
      {isActive !== null && (
        <TodoModal
          isActive={isActive}
          setIsActive={setIsActive}
          activeTodo={todos.find((todo: Todo) => todo.id === isActive) ?? null}
        />
      )}
    </>
  );
};
