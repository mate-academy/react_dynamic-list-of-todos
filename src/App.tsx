/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [filteresTodos, setFiletedTodos] = useState<Todo[]>(todoList);

  useEffect(() => {
    setLoading(true);

    getTodos()
      .then(setTodoList)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    setFiletedTodos(todoList);
  }, [todoList]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter setTodos={setFiletedTodos} todos={todoList} />
            </div>

            <div className="block">
              {loading
                ? <Loader />
                : <TodoList todos={filteresTodos} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
