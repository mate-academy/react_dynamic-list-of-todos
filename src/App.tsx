/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Status, Todo } from './types/Todo';

export const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selected, setSelected] = useState<Todo>();
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<Status>(Status.ALL);

  useEffect(() => {
    setLoading(true);

    getTodos().then(setTodos).finally(() => setLoading(false));
  }, []);

  const filteredTodos = () => {
    let result = [...todos];

    result = [...result].filter(todo => {
      switch (status) {
        case Status.ACTIVE:
          return !todo.completed;
        case Status.COMPLETED:
          return todo.completed;
        default:
          return true;
      }
    });

    if (query.trim()) {
      result = [...result]
        .filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()));
    }

    return result;
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                status={status}
                onStatus={setStatus}
                onSearch={setQuery}
              />
            </div>

            <div className="block">
              {loading
                ? <Loader />
                : <TodoList todos={filteredTodos()} selected={selected} onSelect={setSelected} />}
            </div>
          </div>
        </div>
      </div>

      {selected && <TodoModal selected={selected} onClose={() => setSelected(undefined)} />}
    </>
  );
};
