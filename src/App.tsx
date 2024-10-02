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
import { Status } from './utils/Status';

function getPreparedTodos(
  initTodos: Todo[],
  status: Status,
  query: string,
): Todo[] {
  let todos = [...initTodos];

  if (status === Status.completed) {
    todos = todos.filter(todo => todo.completed);
  }

  if (status === Status.active) {
    todos = todos.filter(todo => !todo.completed);
  }

  if (query) {
    todos = todos.filter(todo =>
      todo.title.toLowerCase().includes(query.toLowerCase()),
    );
  }

  return todos;
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [todo, setTodo] = useState<Todo | null>(null);
  const [status, setStatus] = useState(Status.all);

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(setTodos)
      .finally(() => setIsLoading(false));
  }, []);

  const visibleTodos = getPreparedTodos(todos, status, query);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                status={status}
                onSelect={setStatus}
                query={query}
                onQuery={setQuery}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={visibleTodos}
                  onSelectTodo={setTodo}
                  selectedTodo={todo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {todo && <TodoModal selectedTodo={todo} onSelectTodo={setTodo} />}
    </>
  );
};
