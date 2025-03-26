import React, { useEffect, useState, useCallback, useMemo } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { FILTER } from './helpers/enum';

export const App: React.FC = () => {
  const [allTodos, setAllTodos] = useState<Todo[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [isPending, setIsPending] = useState(false);

  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<FILTER>(FILTER.all);

  useEffect(() => {
    getTodos(setAllTodos, setIsPending);
  }, []);

  const handleQueryChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(event.target.value);
    },
    [],
  );

  const handleFilterChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      setFilter(event.target.value as FILTER);
    },
    [],
  );

  const resetQuery = useCallback(() => {
    setQuery('');
  }, []);

  const filteredTodos = useMemo(() => {
    let visibleTodos = [...allTodos];

    if (query !== '') {
      visibleTodos = visibleTodos.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()),
      );
    }

    if (filter !== FILTER.all) {
      visibleTodos = visibleTodos.filter(item => {
        if (filter === FILTER.done) {
          return item.completed;
        }

        if (filter === FILTER.planing) {
          return !item.completed;
        }

        return true;
      });
    }

    return visibleTodos;
  }, [allTodos, query, filter]);

  const selectedTodo = (id: number): Todo | undefined => {
    return filteredTodos.find(item => item.id === id);
  };

  const activeTodo = selectedId !== null ? selectedTodo(selectedId) : undefined;

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                filter={filter}
                onQueryChange={handleQueryChange}
                onFilterChange={handleFilterChange}
                resetQuery={resetQuery}
              />
            </div>

            <div className="block">
              {isPending && <Loader />}
              <TodoList
                todos={filteredTodos}
                selectedId={selectedId}
                setSelectedId={setSelectedId}
              />
            </div>
          </div>
        </div>
      </div>

      {selectedId && activeTodo && (
        <TodoModal selectedTodo={activeTodo} setSelectedId={setSelectedId} />
      )}
    </>
  );
};
