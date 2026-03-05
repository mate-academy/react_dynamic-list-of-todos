/* eslint-disable prettier/prettier */
/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loader, setLoader] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [todosStatus, setTodosStatus] = useState('all');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const visibleTodos = useMemo(() => {
    return [...todos]
      .filter(todosItem =>
        todosItem.title.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      .filter(todosItem => {
        switch (todosStatus) {
          case 'all':
            return true;
          case 'active':
            return !todosItem.completed;
          case 'completed':
            return todosItem.completed;
          default:
            return true;
        }
      });
  }, [searchQuery, todosStatus, todos]);

  useEffect(() => {
    setLoader(true);
    getTodos()
      .then(setTodos)
      .catch((error: Error) => setErrorMessage(error.message))
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
                onSearch={setSearchQuery}
                onStatus={setTodosStatus}
                searchQuery={searchQuery}
              />
            </div>

            <div className="block">
              {errorMessage === '' && loader && <Loader />}
              {errorMessage === '' ? (
                <TodoList
                  todos={visibleTodos}
                  selectedTodo={selectedTodo}
                  onSelect={setSelectedTodo}
                />
              ) : (
                <div className="error">
                  <p>{errorMessage}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {errorMessage === '' && selectedTodo && (
        <TodoModal
          setSelectedTodo={setSelectedTodo}
          selectedTodo={selectedTodo}
        />
      )}
    </>
  );
};
