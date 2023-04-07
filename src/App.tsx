/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [activeTodo, setActiveTodo] = useState<Todo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [sortBy, setSortBy] = useState('all');
  const [query, setQuery] = useState('');

  useEffect(() => {
    setIsLoading(true);
    getTodos().then((data) => {
      setTodos(data);
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setSortBy={setSortBy}
                sortBy={sortBy}
                query={query}
                setQuery={setQuery}
              />
            </div>

            <div className="block">
              {isLoading
                ? <Loader />
                : (
                  <TodoList
                    todos={todos}
                    setIsOpenModal={setIsOpenModal}
                    setActiveTodo={setActiveTodo}
                    activeTodo={activeTodo}
                    query={query}
                    sortBy={sortBy}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      { isOpenModal && (
        <TodoModal
          setIsOpenModal={setIsOpenModal}
          activeTodo={activeTodo}
          setActiveTodo={setActiveTodo}
        />
      )}
    </>
  );
};
