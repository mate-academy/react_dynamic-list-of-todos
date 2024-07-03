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
import { SortType } from './types/SortType';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selected, setSelected] = useState<Todo | undefined>();
  const [query, setQuery] = useState('');
  const [sortQuery, setSortQuery] = useState<SortType>(SortType.ALL);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTodos()
      .then(e => {
        return e.filter(todo =>
          todo.title.toLowerCase().includes(query.toLowerCase()),
        );
      })
      .then(e => {
        return e.filter(todo => {
          switch (sortQuery) {
            case SortType.ACTIVE:
              return !todo.completed;
            case SortType.COMPLETED:
              return todo.completed;
            default:
              return todo;
          }
        });
      })
      .then(setTodos)
      .finally(() => setLoading(false));
  }, [sortQuery, query]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                onSelect={setSortQuery}
                onQueryChange={setQuery}
                onClear={() => setQuery('')}
              />
            </div>

            <div className="block">
              {loading && <Loader />}
              <TodoList
                todos={todos}
                selected={selected}
                show={todo => setSelected(todo)}
              />
            </div>
          </div>
        </div>
      </div>

      {selected && (
        <TodoModal todo={selected} onClose={() => setSelected(undefined)} />
      )}
    </>
  );
};
