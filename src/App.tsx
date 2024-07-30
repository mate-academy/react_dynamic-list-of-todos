/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { FilterTypes } from './types/FilterTypes';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [filterMethod, setFilterMethod] = useState<FilterTypes>(
    FilterTypes.all,
  );
  const [query, setQuery] = useState('');

  const onClickHandler = (currentTodo: Todo | null) => {
    setSelectedTodo(currentTodo);
  };

  useEffect(() => {
    getTodos().then(todosFromServer => {
      setTodos(todosFromServer);
    });
  }, []);

  const onChangeInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const onChangeFilterHandler = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setFilterMethod(event.target.value as FilterTypes);
  };

  const resetQuery = () => {
    setQuery('');
  };

  const filteredTodos = todos.filter(todo => {
    const hasQuery = todo.title
      .toLowerCase()
      .includes(query.trim().toLowerCase());

    switch (filterMethod) {
      case FilterTypes.active:
        return !todo.completed && hasQuery;

      case FilterTypes.completed:
        return todo.completed && hasQuery;

      case FilterTypes.all:
      default:
        return hasQuery;
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
                onFilterChange={onChangeFilterHandler}
                onInputChange={onChangeInputHandler}
                query={query}
                reset={resetQuery}
              />
            </div>

            <div className="block">
              {todos.length === 0 && <Loader />}
              {todos.length !== 0 && (
                <TodoList
                  todos={filteredTodos}
                  selectedTodo={selectedTodo}
                  onClickHandler={onClickHandler}
                />
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
