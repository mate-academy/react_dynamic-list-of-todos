/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [queryOption, setQueryOption] = useState('');
  const [isSelectTodos, setIsSelectTodos] = useState<Todo | null>(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    getTodos().then((result) => {
      setTodos(result);
    });
  }, []);

  const filterTodo = (queryTodo: string, optionQuery: string) => {
    switch (optionQuery) {
      case 'active':
        return todos.filter(todo => !todo.completed
          && todo.title.toLowerCase().includes(queryTodo.toLowerCase()));

      case 'completed':
        return todos.filter(todo => todo.completed
          && todo.title.toLowerCase().includes(queryTodo.toLowerCase()));

      default:
        return todos;
    }
  };

  const changeQuery = (value: string) => {
    setQuery(value);
  };

  const changeOption = (value: string) => {
    setQueryOption(value);
  };

  const clearQuery = () => {
    setQuery('');
  };

  const cahngedSelectTodo = (value: Todo) => {
    setIsSelectTodos(value);
  };

  const closeModalTodo = () => {
    setIsSelectTodos(null);
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
                onQuery={changeQuery}
                onSelectOption={changeOption}
                onClear={clearQuery}
              />
            </div>

            <div className="block">
              {!todos.length
                ? <Loader />
                : (
                  <TodoList
                    todos={filterTodo(query, queryOption)}
                    onSelect={cahngedSelectTodo}
                    selectedTodo={isSelectTodos}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {isSelectTodos && (
        <TodoModal
          todo={isSelectTodos}
          onClose={closeModalTodo}
        />
      )}
    </>
  );
};
