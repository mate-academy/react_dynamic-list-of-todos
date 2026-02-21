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
  const [listLoader, setListLoader] = useState<boolean>(true);
  const [query, setQuery] = useState<string>('');
  const [appliedQuerry, setAppliedQuerry] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string>('');
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    getTodos()
      .then(todosFromServer => {
        setTodos(todosFromServer);
      })
      .finally(() => setListLoader(false));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                onQueryChange={newQuery => {
                  setQuery(newQuery);
                }}
                filter={selectedFilter}
                onFilterChange={newFilter => setSelectedFilter(newFilter)}
                onAppliedQuerry={newQuerry => setAppliedQuerry(newQuerry)}
              />
            </div>

            <div className="block">
              {listLoader && <Loader />}
              <TodoList
                todos={todos}
                query={appliedQuerry}
                filter={selectedFilter}
                listLoader={listLoader}
                selectedId={selectedId}
                onSelectedId={newId => {
                  setSelectedId(newId);
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {selectedId && (
        <TodoModal
          todos={todos}
          selectedId={selectedId}
          onSelectedId={() => setSelectedId(null)}
        />
      )}
    </>
  );
};
