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
  const [preparedTodos, setPreparedTodos] = useState<Todo[]>([]);
  const [sorted, setSorted] = useState('');
  const [filter, setFilter] = useState('');
  const [modalTodo, setModalTodo] = useState<Todo | undefined>();

  useEffect(() => {
    getTodos().then(data => {
      setTodos(data);
      setPreparedTodos(data);
    });
  }, []);

  useEffect(() => {
    if (sorted === 'active') {
      setPreparedTodos(todos.filter(todo => !todo.completed && todo.title.includes(filter.toLocaleLowerCase())));
    } else if (sorted === 'completed') {
      setPreparedTodos(todos.filter(todo => todo.completed && todo.title.includes(filter.toLocaleLowerCase())));
    } else {
      setPreparedTodos(todos.filter(todo => todo.title.includes(filter.toLocaleLowerCase())));
    }
  }, [filter, sorted, todos]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter filter={filter} setFilter={setFilter} setSorted={setSorted} />
            </div>

            <div className="block">
              {todos.length === 0 && (
                <Loader />
              )}
              {todos.length > 0 && (
                <TodoList todos={preparedTodos} setModalTodo={setModalTodo} modalTodo={modalTodo} />
              )}
            </div>
          </div>
        </div>
      </div>

      {modalTodo && <TodoModal setModalTodo={setModalTodo} modalTodo={modalTodo} />}
    </>
  );
};
