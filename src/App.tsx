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
  const [todos, setTodos] = useState<Todo[]>([]);
  const [visiableTodos, setVisiableTodos] = useState<Todo[]>([]);
  const [loader, setLoader] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    getTodos()
      .then(setTodos);
  }, []);

  useEffect(() => {
    setLoader(true);
    getTodos()
      .then(setVisiableTodos)
      .finally(() => setLoader(false));
  }, []);

  useEffect(() => {
    switch (filter) {
      case 'active':
        setVisiableTodos(todos.filter((t => t.completed)));
        break;

      case 'completed':
        setVisiableTodos(todos.filter((t => !t.completed)));
        break;

      case 'all':
      default:
        setVisiableTodos(todos);
        break;
    }
  }, [filter]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter filter={filter} setFilter={setFilter} />
            </div>

            <div className="block">
              {loader
                ? <Loader />
                : <TodoList todos={visiableTodos} setSelectedTodo={setSelectedTodo} selectedTodo={selectedTodo} />}
            </div>
          </div>
        </div>
      </div>

      {!loader && selectedTodo
        && <TodoModal todo={selectedTodo} setSelectedTodo={setSelectedTodo} />}
    </>
  );
};
