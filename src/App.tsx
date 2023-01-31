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
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([] as Todo[]);
  const [activeTodo, setActiveTodo] = useState<Todo | null>(null);

  const handleSelectTodo = (todo: Todo | null) => setActiveTodo(todo);

  useEffect(() => {
    getTodos()
      .then(setVisibleTodos);
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter />
            </div>

            <div className="block">
              {!visibleTodos.length ? (
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
