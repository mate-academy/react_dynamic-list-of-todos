/* eslint-disable max-len */
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
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todosToShow, setTodosToShow] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [shownTodoId, setShownTodoId] = useState<null | number>(null);

  useEffect(() => {
    const loadData = async () => {
      setTodos(await getTodos());
      setTodosToShow(await getTodos());
      setLoading(false);
    };

    loadData();
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter todos={todos} setTodosToShow={setTodosToShow} />
            </div>

            <div className="block">
              {(loading && <Loader />)
              || <TodoList todos={todosToShow} setShownTodoId={setShownTodoId} />}
            </div>
          </div>
        </div>
      </div>

      {shownTodoId && <TodoModal todoId={shownTodoId} setShownTodoId={setShownTodoId} />}
    </>
  );
};
