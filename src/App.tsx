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

function prepareTodo(
  qwery: string,
  todos: Todo[],
  field: string,
) {
  let isVisibleTodo = [...todos];

  if (qwery) {
    isVisibleTodo = isVisibleTodo.filter(todo => {
      return todo
        .title
        .toLocaleLowerCase()
        .includes(qwery);
    });
  }

  switch (field) {
    case ('active'):
      isVisibleTodo = isVisibleTodo.filter(todo => !todo.completed);
      break;

    case ('completed'):
      isVisibleTodo = isVisibleTodo.filter(todo => todo.completed);
      break;

    default:
      break;
  }

  return isVisibleTodo;
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isSelectedTodo, setIsSelectedTodo] = useState<Todo | null>(null);
  const [sortBy, setSortBy] = useState('all');
  const [qwery, setQwery] = useState('');
  const [hasErorr, setHasErorr] = useState(false);

  const preparedQwery = qwery.trim().toLocaleLowerCase();

  const preparedTodo = prepareTodo(preparedQwery, todos, sortBy);

  const handleSelect = (sortField: string) => {
    setSortBy(sortField);
  };

  const handleChangeQwery = (searchString: string) => {
    setQwery(searchString);
  };

  useEffect(() => {
    getTodos()
      .then(data => {
        setTodos(data);
      })
      .catch(() => {
        setHasErorr(true);
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
          {hasErorr
            ? (
              <span>Sorry, try later</span>
            ) : (
              <div className="box">
                <h1 className="title">Todos:</h1>

                <div className="block">
                  <TodoFilter
                    sortBy={sortBy}
                    qwery={qwery}
                    onHandleSelect={handleSelect}
                    onhandleChangeQwery={handleChangeQwery}
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
