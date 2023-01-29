import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import { getTodos } from './api';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [query, setQuery] = useState('');
  const [select, setSelect] = useState('all');
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const [allTodos, setAllTodos] = useState<Todo[]>([]);
  const [selectTodo, setSelectTodo] = useState<Todo>();

  useEffect(() => {
    getTodos().then(result => setAllTodos(result));

    setVisibleTodos(allTodos.filter(todo => {
      switch (select) {
        case ('all'):
          return todo.title.toUpperCase().includes(query.toUpperCase().trim());

        case ('active'):
          return todo.title.toUpperCase().includes(query.toUpperCase().trim())
            && !todo.completed;

        case ('completed'):
          return todo.title.toUpperCase().includes(query.toUpperCase().trim())
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
    setSelectTodo(undefined);
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
              <TodoList
                todos={visibleTodos}
                onUserClick={gettingTodo}
              />
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
