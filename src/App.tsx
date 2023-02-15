/* eslint-disable max-len */
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { useEffect, useState } from 'react';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import { Todo } from './types/Todo';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [allTodos, setAllTodos] = useState<Todo[]>([]);
  const [selectTodos, setSelectTodos] = useState<Todo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [filterType, setFilterType] = useState('all');
  const [query, setQuery] = useState('');

  useEffect(() => {
    setIsLoading(true);
    getTodos().then(setAllTodos)

      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const trimmed = query.toLocaleLowerCase().trim();

  const visibleTodos = allTodos
    .filter((todo) => {
      const title = todo.title.toLocaleLowerCase();

      return title.includes(trimmed);
    })
    .filter((todo) => {
      switch (filterType) {
        case 'active':
          return !todo.completed;
        case 'completed':
          return todo.completed;

        default:
          return true;
      }
    });

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                selectedFilter={filterType}
                onSetQuery={setQuery}
                onSetSelectedFilter={setFilterType}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={visibleTodos}
                  selectedTodo={selectTodos}
                  isSelected={setSelectTodos}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectTodos && <TodoModal />}
    </>
  );
};
