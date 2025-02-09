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
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState('');
  const [modalTodo, setModalTodo] = useState<Todo | null>(null);
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    getTodos().then(response => {
      let filtered = response.filter(todo =>
        todo.title.toLowerCase().includes(filter.toLowerCase()),
      );

      if (filterStatus === 'active') {
        filtered = filtered.filter(todo => todo.completed === false);
      } else if (filterStatus === 'completed') {
        filtered = filtered.filter(todo => todo.completed === true);
      }

      setTodos(filtered);
    });
  }, [filter, filterStatus]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filter={filter}
                setFilter={setFilter}
                setFilterStatus={setFilterStatus}
              />
            </div>

            <div className="block">
              {todos.length === 0 && <Loader />}
              <TodoList
                todos={todos}
                modalTodo={modalTodo}
                setModalTodo={setModalTodo}
              />
            </div>
          </div>
        </div>
      </div>
      {modalTodo && (
        <TodoModal modalTodo={modalTodo} setModalTodo={setModalTodo} />
      )}
    </>
  );
};
