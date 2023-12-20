/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';
import { TodoModal } from './components/TodoModal';
import { Todo } from './types/Todo';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterTodos, setFilterTodos] = useState<Todo[]>([]);
  const [selectTodo, setSelectTodo] = useState<Todo | null>(null);

  useEffect(() => {
    getTodos()
      .then(todosFromServer => {
        setTodos(todosFromServer);
        setFilterTodos(todosFromServer);
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
                todos={todos}
                setFilterTodos={setFilterTodos}
              />
            </div>

            <div className="block">
              {!isLoading ? (
                <TodoList
                  todos={filterTodos}
                  selectTodo={selectTodo}
                  setSelectTodo={setSelectTodo}
                />
              )
                : (
                  <Loader />
                )}
            </div>
          </div>
        </div>
      </div>

      {selectTodo && (
        <TodoModal
          todo={selectTodo}
          setSelectTodo={setSelectTodo}
        />
      )}
    </>
  );
};
