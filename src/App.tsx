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
import { useDebounce } from './hooks/useDebounce';
import { prepareTodos } from './prepareTodos';

export const App: React.FC = () => {
  const { show, filterField, query } = useContext(TodosContext);

  const [todos, setTodos] = useState<Todo[]>([]);
  const debouncedQuery = useDebounce(query);

  useEffect(() => {
    getTodos().then(todosFromSetver => setTodos(todosFromSetver));
  });

  const visibleTodos = prepareTodos(todos, filterField, debouncedQuery);

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
                : <TodoList todos={visibleTodos} />}
            </div>
          </div>
        </div>
      </div>

      {show && <TodoModal />}
    </>
  );
};
