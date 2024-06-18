/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { SortQuery } from './types/Sort';

export const App: React.FC = () => {
  const [query, setQuery] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Todo | undefined>();
  const [sortQuery, setSortQuery] = useState<SortQuery>(SortQuery.ALL);

  useEffect(() => {
    getTodos()
      .then(e => {
        return e.filter(todo =>
          todo.title.toLowerCase().includes(query.toLowerCase()),
        );
      })
      .then(e => {
        return e.filter(todo => {
          if (sortQuery === 'active') {
            return !todo.completed;
          }

          if (sortQuery === 'completed') {
            return todo.completed;
          }

          return todo;
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
                onQChange={setQuery}
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
