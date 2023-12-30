/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Filter } from './types/enum/Filter';
import { TodosState } from './types/TodosState';

const defaultState: TodosState = {
  todos: [],
  filter: Filter.All,
  query: '',
};

export const App: React.FC = () => {
  const [todosState, setTodosState] = useState<TodosState>(defaultState);
  const [loading, setLoading] = useState(false);

  const [todoId, setTodoId] = useState<number | null>(null);

  const { todos } = todosState;

  useEffect(() => {
    setLoading(true);

    getTodos()
      .then((serverTodos) => setTodosState((currentTodosState) => ({
        ...currentTodosState,
        todos: serverTodos,
      })))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter setTodosState={setTodosState} todosState={todosState} />
            </div>

            <div className="block">
              { loading ? (
                <Loader />
              ) : (
                <TodoList
                  todosState={todosState}
                  setTodoId={setTodoId}
                  todoId={todoId}
                />
              ) }
            </div>
          </div>
        </div>
      </div>

      {todoId !== null && (
        <TodoModal
          todos={todos}
          todoId={todoId}
          setTodoId={setTodoId}
        />
      )}
    </>
  );
};
