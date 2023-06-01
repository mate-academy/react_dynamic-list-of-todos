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

export const filterOptions = ['all', 'active', 'completed'];

export const App: React.FC = () => {
  const [todosFromServer, setTodosFromServer] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [filter, setFilter] = useState(filterOptions[0]);
  const [searchValue, setSearchValue] = useState('');

  const validValue = searchValue.toLowerCase().trimStart();

  const normalizeTitle = (item: string) => item
    .toLowerCase().includes(validValue);

  useEffect(() => {
    getTodos()
      .then((todo) => setTodosFromServer(todo));
  }, []);

  const getFilteredTodos = () => {
    switch (filter) {
      case 'active':
        return todosFromServer.filter(todo => !todo.completed);

      case 'completed':
        return todosFromServer.filter(todo => todo.completed);

      default:
        return todosFromServer;
    }
  };

  const filteredTodos = useMemo(
    getFilteredTodos,
    [filter, todosFromServer],
  );

  const getVisibleTodos = () => {
    return filteredTodos.filter(todo => normalizeTitle(todo.title));
  };

  const visibleTodos = getVisibleTodos();

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                options={filterOptions}
                filter={filter}
                setFilter={setFilter}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
              />
            </div>

            <div className="block">
              {todosFromServer.length > 0
                ? (
                  <TodoList
                    todos={visibleTodos}
                    selectedTodo={selectedTodo}
                    setSelectedTodo={setSelectedTodo}

                  />
                )
                : (
                  <Loader />
                )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          setSelectedTodo={setSelectedTodo}
        />
      )}
    </>
  );
};
