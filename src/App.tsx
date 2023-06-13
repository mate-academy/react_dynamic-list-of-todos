/* eslint-disable max-len */
import React, { useState, useEffect, useMemo } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';

export const filterOptions = ['all', 'active', 'completed'];

export const App: React.FC = () => {
  const [todosFromServer, setTodosFromServer] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [filter, setFilter] = useState(filterOptions[0]);
  const [searchValue, setSearchValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getTodos()
      .then((todos) => {
        setTodosFromServer(todos);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const getVisibleTodos = () => {
    const validValue = searchValue.toLowerCase().trimStart();

    const normalizeTitle = (item: string) => item
      .toLowerCase().includes(validValue);

    switch (filter) {
      case 'active':
        return todosFromServer.filter(todo => !todo.completed && normalizeTitle(todo.title));

      case 'completed':
        return todosFromServer.filter(todo => todo.completed && normalizeTitle(todo.title));

      default:
        return todosFromServer.filter(todo => normalizeTitle(todo.title));
    }
  };

  const visibleTodos = useMemo(
    getVisibleTodos,
    [filter, todosFromServer, searchValue],
  );

  const searchHandler = (value: string) => {
    setSearchValue(value);
  };

  const selectHandler = (value: string) => {
    setFilter(value);
  };

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
                onSelect={selectHandler}
                searchValue={searchValue}
                onChange={searchHandler}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}
              {!isLoading && todosFromServer.length > 0 ? (
                <TodoList
                  todos={visibleTodos}
                  selectedTodo={selectedTodo}
                  setSelectedTodo={setSelectedTodo}
                />
              ) : (
                !isLoading && <p>No todos found.</p>
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
