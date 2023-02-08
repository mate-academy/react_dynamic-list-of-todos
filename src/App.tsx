import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import { getTodos } from './api';
import { Todo } from './types/Todo';
import { SortSelectors } from './types/SortSelectors';

export const App: React.FC = () => {
  const [query, setQuery] = useState('');
  const [
    select,
    setSelect,
  ] = useState<SortSelectors | string>(SortSelectors.all);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const [allTodos, setAllTodos] = useState<Todo[]>([]);
  const [selectTodo, setSelectTodo] = useState<Todo | null>(null);

  useEffect(() => {
    getTodos().then(result => setAllTodos(result));

    setVisibleTodos(allTodos.filter(todo => {
      const queryFilter = todo.title
        .toUpperCase()
        .includes(query.toUpperCase().trim());

      switch (select) {
        case (SortSelectors.all):
          return queryFilter;

        case (SortSelectors.active):
          return queryFilter
            && !todo.completed;

        case (SortSelectors.completed):
          return queryFilter
            && todo.completed;

        default:
          return false;
      }
    }));
  }, [query, select, allTodos]);

  const onQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const onSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelect(event.target.value);
  };

  const onButtonClick = () => {
    setQuery('');
  };

  const gettingTodo = (todo: Todo) => {
    setSelectTodo(todo);
  };

  const onModalClose = () => {
    setSelectTodo(null);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                onSelectChange={onSelectChange}
                onInputChange={onQueryChange}
                onDelete={onButtonClick}
              />
            </div>

            <div className="block">
              {!allTodos.length && <Loader />}
              {visibleTodos.length && (
                <TodoList
                  todos={visibleTodos}
                  selectTodo={selectTodo}
                  onUserClick={gettingTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectTodo && (
        <TodoModal
          todo={selectTodo}
          onClose={onModalClose}
        />
      )}
    </>
  );
};
