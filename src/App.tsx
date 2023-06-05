/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos, getUser } from './api';
import { SortBy } from './types/SortBy';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>();
  const [sortBy, setSortBy] = useState(SortBy.all);
  const [query, setQuery] = useState('');
  const [isLoading, setIsloading] = useState(true);

  useEffect(() => {
    getTodos().then(data => {
      setTodos(data);
      setIsloading(false);
    });
  }, []);

  const handleSelectBtn = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  const handleClickCross = () => {
    setSelectedTodo(null);
  };

  const handleSelectFilter = (value: SortBy) => {
    setSortBy(value);
  };

  const handleInputFilter = (value: string) => {
    setQuery(value);
  };

  const handleClearInputBtn = () => {
    setQuery('');
  };

  let visibleListOfTodos = todos.filter(el => el.title.includes(query));

  switch (sortBy) {
    case SortBy.active:
      visibleListOfTodos = visibleListOfTodos.filter(
        el => el.completed === false,
      );
      break;

    case SortBy.completed:
      visibleListOfTodos = todos.filter(
        el => el.completed === true,
      );
      break;

    default:
      break;
  }

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onSelect={handleSelectFilter}
                onInput={handleInputFilter}
                query={query}
                onClickClearButton={handleClearInputBtn}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  listOfTodos={visibleListOfTodos}
                  onSelect={handleSelectBtn}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          onCross={handleClickCross}
          todo={selectedTodo}
          getUser={getUser}
          loading={isLoading}
        />
      )}
    </>
  );
};
