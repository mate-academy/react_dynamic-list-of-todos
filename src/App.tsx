/* eslint-disable max-len */
import { FC, useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
export enum Status {
  all = 'all',
  active = 'active',
  completed = 'completed',
}

export const App: FC = () => {
  const [status, setStatus] = useState<Status>(Status.all);
  const [query, setQuery] = useState<string>('');
  const [todosFromServer, setTodosFromServer] = useState<Todo[]>([]);
  const [isOpenedTodo, setIsOpenedTodo] = useState<Todo | null>(null);
  let displayedTodos = [...todosFromServer];

  if (status === Status.active) {
    displayedTodos = todosFromServer.filter(todo => !todo.completed);
  }

  if (status === Status.completed) {
    displayedTodos = todosFromServer.filter(todo => todo.completed);
  }

  if (query) {
    displayedTodos = displayedTodos.filter(todo =>
      todo.title.toLowerCase().includes(query.toLowerCase()),
    );
  }

  useEffect(() => {
    getTodos().then(todos => {
      setTodosFromServer(todos);
    });
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onStatusChange={setStatus}
                onQueryChange={setQuery}
                query={query}
              />
            </div>

            <div className="block">
              {todosFromServer.length === 0 && <Loader />}
              {todosFromServer.length !== 0 && (
                <TodoList
                  todos={displayedTodos}
                  onClickedPreview={setIsOpenedTodo}
                  isOpenedTodo={isOpenedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {isOpenedTodo && (
        <TodoModal todo={isOpenedTodo} onClosedPreview={setIsOpenedTodo} />
      )}
    </>
  );
};
