/* eslint-disable max-len */
import React, { useContext, useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { TodosContext } from './context/TodosContext';
import { Select } from './types/Select';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    getTodos().then(todosFromSetver => setTodos(todosFromSetver));
  });

  const { show, filterField, query } = useContext(TodosContext);

  function prepareTodos(listOfTodos: Todo[]) {
    let preparedTodos = [...listOfTodos];

    preparedTodos = preparedTodos.filter(todo => {
      switch (filterField) {
        case Select.Active:
          return todo.completed === false;

        case Select.Completed:
          return todo.completed === true;

        default:
          return todo;
      }
    });

    if (query) {
      const queryNormalize = query.toLowerCase().trim();

      preparedTodos = preparedTodos
        .filter(todo => todo.title.toLowerCase().includes(queryNormalize));
    }

    return preparedTodos;
  }

  const preparedTodos = prepareTodos(todos);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter />
            </div>

            <div className="block">
              {!todos.length
                ? <Loader />
                : <TodoList todos={preparedTodos} />}
            </div>
          </div>
        </div>
      </div>

      {show && <TodoModal />}
    </>
  );
};
