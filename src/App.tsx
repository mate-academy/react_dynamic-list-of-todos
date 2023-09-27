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

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[] | null>(null);
  const [sortedTodos, setSortedTodos] = useState<Todo[] | null>(null);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [loader, setLoader] = useState<boolean>(false);

  useEffect(() => {
    setLoader(true);

    getTodos()
      .then((response) => {
        setTodos(response);
        setSortedTodos(response);
      })
      .finally(() => setLoader(false));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter todos={todos} setTodos={setSortedTodos} />
            </div>

            <div className="block">
              {loader && (
                <Loader />
              )}
              <TodoList todos={sortedTodos} selectedTodo={selectedTodo} setSelectedTodo={setSelectedTodo} />
            </div>
          </div>
        </div>
      </div>
      {
        selectedTodo && (
          <TodoModal
            todo={selectedTodo}
            selectTodo={setSelectedTodo}
          />
        )
      }
    </>
  );
};
