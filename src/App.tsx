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
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loader, setLoader] = useState(true);
  const [sortedTodos, setSortedTodos] = useState<Todo[]>([]);

  useEffect(() => {
    getTodos()
      .then(elements => {
        setTodos(elements);
        setSortedTodos(elements);
      })
      .finally(() => {
        setLoader(false);
      });
  }, []);

  const handleSortList = (newSortedTodos: Todo[]) => {
    setSortedTodos(newSortedTodos);
  };

  return (
    <div className="section">
      <div className="container">
        <div className="box">
          <h1 className="title">Todos:</h1>

          <div className="block">
            <TodoFilter todos={todos} onSortList={handleSortList} />
          </div>

          <div className="block">
            {loader && <Loader />}
            {!loader && <TodoList todos={sortedTodos} />}{' '}
            {/* Передаем отсортированные задачи */}
          </div>
        </div>
      </div>
    </div>
  );
};
