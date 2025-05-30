/* eslint-disable max-len */
import React, { useCallback, useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import * as todosAPI from './api/api';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [loader, setLoader] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectionTodo, setSelectionTodo] = useState<Todo | null>(null);

  useEffect(() => {
    setLoader(true);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    todosAPI
      .getTodos()
      .then(setTodos)
      .finally(() => setLoader(false));
  }, []);

  const onSelect = useCallback((filter: string) => {
    // console.log('In onSelect...');

    switch (filter) {
      case 'active':
        return todosAPI
          .getTodos()
          .then(fetchedTodos => fetchedTodos.filter(todo => !todo.completed))
          .then(setTodos);
      case 'completed':
        return todosAPI
          .getTodos()
          .then(fetchedTodos => fetchedTodos.filter(todo => todo.completed))
          .then(setTodos);
      default:
        return todosAPI.getTodos().then(setTodos);
    }
  }, []);

  const makeQuery = (appliedQuery: string) => {
    todosAPI
      .getTodos()
      .then(fetchedTodos => {
        const filteredTodos = fetchedTodos.filter(todo =>
          todo.title
            .replaceAll(' ', '')
            .toLowerCase()
            .startsWith(appliedQuery.replaceAll(' ', '').toLowerCase())
        );

        return filteredTodos;
      })
      .then(setTodos);
  };

  const getTodoId = (todo: Todo) => {
    setSelectionTodo(todo);
  };

  const onClose = () => {
    setSelectionTodo(null);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter onSelect={onSelect} makeQuery={makeQuery} />
            </div>

            <div className="block">
              {loader && <Loader />}
              <TodoList todos={todos} getTodoId={getTodoId} />
            </div>
          </div>
        </div>
      </div>

      {selectionTodo && (
        <TodoModal selectionTodo={selectionTodo} onClose={onClose} />
      )}
    </>
  );
};
