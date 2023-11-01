/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { Status } from './types/Status';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<Status>(Status.All);

  useEffect(() => {
    getTodos()
      .then(setTodos);
  }, []);

  const filteredTodos: Todo[] = useMemo(() => {
    const copyTodos = [...todos];

    if (query) {
      copyTodos.filter(todo => todo.title.includes(
        query.trim().toLowerCase() || query.trim().toUpperCase(),
      ));
    }

    switch (filterStatus) {
      case Status.Active:
        return copyTodos.filter(todo => !todo.completed);

      case Status.Completed:
        return copyTodos.filter(todo => todo.completed);

      default:
        return copyTodos;
    }
  }, [query, filterStatus, todos]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                setQuery={setQuery}
                setFilterStatus={setFilterStatus}
              />
            </div>

            <div className="block">
              <Loader />
              <TodoList
                todos={filteredTodos}
              />
            </div>
          </div>
        </div>
      </div>

      <TodoModal />
    </>
  );
};
