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
  const [chooseTodo, setChooseTodo] = useState<Todo | null>(null);

  const [loader, setLoader] = useState(false);

  const [filter, setFilter] = useState('');
  const [status, setStatus] = useState('all');

  useEffect(() => {
    setLoader(true);

    getTodos()
      .then(setTodos)
      .finally(() => setLoader(false));
  }, []);

  const filteredTodos = todos.filter(todo => {
    const matchesStatus =
      status === 'all' ||
      (status === 'active' && !todo.completed) ||
      (status === 'completed' && todo.completed);
    const matchesFilter = todo.title
      .toLowerCase()
      .includes(filter.toLowerCase());

    return matchesStatus && matchesFilter;
  });

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter setFilter={setFilter} setStatus={setStatus} />
            </div>

            <div className="block">
              {loader ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  setTodo={setChooseTodo}
                  chooseTodo={chooseTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {chooseTodo && <TodoModal todo={chooseTodo} setTodo={setChooseTodo} />}
    </>
  );
};
