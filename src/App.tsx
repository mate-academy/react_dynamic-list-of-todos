/* eslint-disable max-len */
import React, { useContext, useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { getTodos } from './api';
import { data } from './services/data';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Todo } from './types/Todo';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { TodosContext } from './components/context/TodosContext';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const { selectedTodo, filterTodos, query } = useContext(TodosContext);

  useEffect(() => {
    getTodos().then(dataFromAPI => setTodos(dataFromAPI));
  }, []);

  const preparedTodos = data(todos, filterTodos, query);

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
              {!todos.length && (
                <Loader />
              )}

              {!!todos.length && (
                <TodoList todos={preparedTodos} />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo?.userId && (
        <TodoModal />
      )}
    </>
  );
};
