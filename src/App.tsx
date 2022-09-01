/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { getTodos } from './api';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const loaderData = (filterText: string) => {
    switch (filterText) {
      case 'completed':
        getTodos().then(res => {
          setTodos(res
            .filter((todo) => todo.title.includes(search))
            .filter((todo) => todo.completed === true));
        });
        break;

      case 'active':
        getTodos().then(res => {
          setTodos(res
            .filter((todo) => todo.title.includes(search))
            .filter((todo) => todo.completed === false));
        });
        break;

      default:
        getTodos().then(res => {
          setTodos(res
            .filter((todo) => todo.title.includes(search)));
        });
    }
  };

  useEffect(() => {
    loaderData(filter);
  });

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">{`Todos: ${filter}`}</h1>

            <div className="block">
              <TodoFilter
                setSearch={setSearch}
                search={search}
                filter={setFilter}
              />
            </div>

            <div className="block">
              <TodoList
                todos={todos}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
