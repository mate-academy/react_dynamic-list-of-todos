/* eslint-disable max-len */
import React, { useCallback, useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { Filter } from './types/Filter';

export const App: React.FC = () => {
  const [baseTodos, setBaseTodos] = useState<Todo[]>();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [sortType, setSortType] = useState<Filter>('all');
  const [query, setQuery] = useState('');
  const [loadStatus, setLoadStatus] = useState(false);

  useEffect(() => {
    setLoadStatus(false);

    getTodos().then((rawTodos: Todo[]) => {
      setBaseTodos(rawTodos);
      setTodos(rawTodos);
      setLoadStatus(true);
    });
  }, []);

  useEffect(() => {
    if (!baseTodos) {
      return;
    }

    const tds = baseTodos.filter(todo => {
      switch (sortType) {
        case 'active': {
          if (!todo.completed && todo.title.includes(query)) {
            return true;
          }

          return false;
        }

        case 'completed': {
          if (todo.completed && todo.title.includes(query)) {
            return true;
          }

          return false;
        }

        case 'all':
          if (todo.title.includes(query)) {
            return true;
          }

          return false;
      }
    });

    setTodos(tds);
  }, [sortType, query, baseTodos]);

  const onSort = useCallback(
    (event: React.FormEvent) => {
      const newFilter: Filter = event.target.value as Filter;

      if (sortType !== newFilter) {
        setSortType(newFilter);
      }
    },
    [sortType],
  );

  const appliedQuery = useCallback(
    (value: string) => setQuery(value.toLowerCase()),
    [],
  );

  const onSelect = (todo: Todo | null) => {
    setSelectedTodo(todo);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter onSort={onSort} onAppliedQuery={appliedQuery} />
            </div>

            <div className="block">
              {!loadStatus && <Loader />}
              <TodoList
                todos={todos}
                onSelect={onSelect}
                selected={selectedTodo}
              />
            </div>
          </div>
        </div>
      </div>

      {selectedTodo ? (
        <TodoModal
          todo={selectedTodo}
          userId={selectedTodo.userId}
          onModalWindowClose={() => onSelect(null)}
        />
      ) : (
        ''
      )}
    </>
  );
};
