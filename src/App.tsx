/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { Status } from './types/Status';
import { filter } from './utils/filter';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState(Status.ALL);

  const [isLoadingTodos, setIsLoadingTodos] = useState(true);

  useEffect(() => {
    getTodos().then(newTodos => {
      setTodos(newTodos);
      setIsLoadingTodos(false);
    });
  }, []);

  const visiblTodos = filter(todos, query, status);

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
                setStatus={setStatus}
              />
            </div>

            <div className="block">
              {isLoadingTodos ? (
                <Loader />
              ) : (
                <TodoList
                  todos={visiblTodos}
                  currentTodo={currentTodo}
                  setCurrentTodo={setCurrentTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {currentTodo && (
        <TodoModal todo={currentTodo} setCurrentTodo={setCurrentTodo} />
      )}
    </>
  );
};
