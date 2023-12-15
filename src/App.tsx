/* eslint-disable max-len */
import '@fortawesome/fontawesome-free/css/all.css';
import 'bulma/css/bulma.css';
import React, { useEffect, useState } from 'react';
import './App.scss';

import { getTodos } from './api';
import { Loader } from './components/Loader';
import { TodoFilter } from './components/TodoFilter';
import { TodoList } from './components/TodoList';
import { TodoModal } from './components/TodoModal';
import { Todo } from './types/Todo';
import { filterTodos } from './helper';
import { Status } from './types/Status';

export const App: React.FC = () => {
  const [todosFromServer, setTodos] = useState<Todo[]>([]);
  const [isTodosLoading, setIsTodosLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<Status>(Status.All);
  const [titleFilter, setTitleFilter] = useState('');
  const [todoSelected, setTodoSelected] = useState<Todo | null>(null);

  const todosToView = filterTodos(todosFromServer, statusFilter, titleFilter);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .finally(() => setIsTodosLoading(false));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                statusFilter={statusFilter}
                titleFilter={titleFilter}
                setStatusFilter={setStatusFilter}
                setTitleFilter={setTitleFilter}
              />
            </div>

            <div className="block">
              {isTodosLoading
                ? <Loader />
                : (
                  <TodoList
                    todos={todosToView}
                    todoSelected={todoSelected}
                    setTodoSelected={setTodoSelected}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {todoSelected && (
        <TodoModal
          todoSelected={todoSelected}
          setTodoSelected={setTodoSelected}
        />
      )}
    </>
  );
};
