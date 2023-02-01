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
  const [loadedTodos, setLoadedTodos] = useState<Todo[]>([] as Todo[]);
  const [activeTodo, setActiveTodo] = useState<Todo | null>(null);
  const [query, setQuery] = useState('');

  const handleSelectTodo = (todo: Todo | null) => setActiveTodo(todo);
  const handleSetQuery = (queryValue: string) => setQuery(queryValue);

  // eslint-disable-next-line no-console
  console.log(query);

  useEffect(() => {
    getTodos()
      .then(setLoadedTodos);
  }, []);

  const visibleTodos = loadedTodos.filter(todo => {
    return todo.title.toLowerCase().includes(query);
  });

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                handleSetQuery={handleSetQuery}
                queryValue={query}
              />
            </div>

            <div className="block">
              {!loadedTodos.length ? (
                <Loader />
              ) : (
                <TodoList
                  todos={visibleTodos}
                  activeTodo={activeTodo}
                  selectTodo={handleSelectTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {activeTodo && (
        <TodoModal
          activeTodo={activeTodo}
          selectTodo={handleSelectTodo}
        />
      )}
    </>
  );
};
