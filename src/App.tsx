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
import { Filter } from './enums/Filter';

export const App: React.FC = () => {
  const [isFetching, setIsFetching] = useState(true);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState(Filter.All);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<Todo | null>(null);

  // on mount
  useEffect(() => {
    getTodos().then(todosFromServer => {
      setIsFetching(false);
      setTodos(todosFromServer);
    });
  }, []);

  const todosToDisplay = useMemo(() => {
    let filteredTodos = todos;

    switch (filter) {
      case Filter.Active:
        filteredTodos = filteredTodos.filter(({ completed }) => !completed);
        break;
      case Filter.Completed:
        filteredTodos = filteredTodos.filter(({ completed }) => completed);
        break;
    }

    if (query) {
      filteredTodos = filteredTodos.filter(({ title }) =>
        title.toLowerCase().includes(query.toLowerCase().trim()),
      );
    }

    return filteredTodos;
  }, [filter, query, todos]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter onFilterChange={setFilter} onQueryChange={setQuery} />
            </div>

            <div className="block">
              {isFetching ? (
                <Loader />
              ) : (
                <TodoList
                  todos={todosToDisplay}
                  selected={selected}
                  onSelect={setSelected}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selected !== null && (
        <TodoModal todo={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
};
