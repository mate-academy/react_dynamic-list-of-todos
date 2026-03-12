/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';

enum Filter {
  ALL = 'all',
  ACTIVE = 'active',
  COMPLETED = 'completed',
}

const strategy: Record<Filter, (todo: Todo) => boolean> = {
  [Filter.ALL]: () => true,
  [Filter.ACTIVE]: todo => !todo.completed,
  [Filter.COMPLETED]: todo => todo.completed,
};

const isFilter = (value: string): value is Filter => {
  return Object.values(Filter).includes(value as Filter);
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [filter, setFilter] = useState(Filter.ALL);
  const [textSearch, setTextSearch] = useState<string>('');

  const handleSelectionClick = (todo: Todo) => {
    setSelectedId(todo.id);
  };

  const handleClosingClick = () => {
    setSelectedId(null);
  };

  const handleFilterChoise = (value: string) => {
    if (isFilter(value)) {
      setFilter(value);
    }
  };

  const handleTextSearchInput = (value: string) => {
    setTextSearch(value);
  };

  useEffect(() => {
    getTodos().then(data => {
      setTodos(data);
      setIsLoaded(true);
    });
  }, []);

  const todosToPresent = todos
    .filter(strategy[filter])
    .filter(todo =>
      todo.title.toLowerCase().includes(textSearch.toLowerCase()),
    );

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                textSearch={textSearch}
                handleFilterChoise={handleFilterChoise}
                handleTextSearchInput={handleTextSearchInput}
              />
            </div>

            <div className="block">
              {!isLoaded ? (
                <Loader />
              ) : (
                <TodoList
                  todoList={todosToPresent}
                  selectedId={selectedId}
                  onClick={handleSelectionClick}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {selectedId ? (
        <TodoModal
          todo={
            todos.find(todo => todo.id === selectedId) ??
            (() => {
              throw new Error('Todo not found');
            })()
          }
          onClick={handleClosingClick}
        />
      ) : (
        ''
      )}
    </>
  );
};
