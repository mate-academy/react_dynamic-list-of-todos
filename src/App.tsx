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

import { prepareTodo } from './utils/PrepareTodo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[] | []>([]);
  const [isSelectedTodo, setIsSelectedTodo] = useState<Todo | null>(null);
  const [sortBy, setSortBy] = useState('all');
  const [query, setQuery] = useState('');
  const [hasError, setHasError] = useState(false);

  const preparedquery = query.trim().toLocaleLowerCase();

  const preparedTodo = prepareTodo(preparedquery, todos, sortBy);

  const handleSelect = (sortField: string) => {
    setSortBy(sortField);
  };

  const handleChangeQuery = (searchString: string) => {
    setQuery(searchString);
  };

  useEffect(() => {
    getTodos()
      .then(data => {
        setTodos(data);
      })
      .catch(() => {
        setHasError(true);
      });
  }, []);

  const closeTodo = () => {
    setIsSelectedTodo(null);
  };

  const setSelectedTodo = (todo: Todo) => {
    setIsSelectedTodo(todo);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          {hasError
            ? (
              <span>Sorry, try later</span>
            ) : (
              <div className="box">
                <h1 className="title">Todos:</h1>

                <div className="block">
                  <TodoFilter
                    sortBy={sortBy}
                    query={query}
                    onHandleSelect={handleSelect}
                    onHandleChangeQuery={handleChangeQuery}
                  />
                </div>

                <div className="block">
                  {todos.length > 0
                    ? (
                      <TodoList
                        todos={preparedTodo}
                        setSelectedTodo={setSelectedTodo}
                        isSelectedTodo={isSelectedTodo}
                      />
                    ) : (
                      <Loader />
                    )}
                </div>
              </div>
            )}
        </div>
      </div>

      {isSelectedTodo && (
        <TodoModal
          isSelectedTodo={isSelectedTodo}
          closeTodo={closeTodo}
        />
      )}
    </>
  );
};
