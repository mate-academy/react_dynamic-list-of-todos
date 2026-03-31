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
import { Status } from './types/Status';

type Filters = {
  status: Status;
  query: string;
};

function getPreparedTodos(todos: Todo[], { status, query }: Filters): Todo[] {
  let preparedTodos = [...todos];

  if (status) {
    switch (status) {
      case Status.Completed:
        preparedTodos = preparedTodos.filter(todo => todo.completed);
        break;
      case Status.Active:
        preparedTodos = preparedTodos.filter(todo => !todo.completed);
        break;
    }
  }

  if (query) {
    const normalizedQuery = query.trim().toLowerCase();

    preparedTodos = preparedTodos.filter(todo =>
      todo.title.toLowerCase().includes(normalizedQuery),
    );
  }

  return preparedTodos;
}

export const App: React.FC = () => {
  const [loader, setLoader] = useState(true);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [status, setStatus] = useState<Status>(Status.All);
  const [query, setQuery] = useState('');

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(error => error.message)
      .finally(() => setLoader(false));
  }, []);

  const visibleGoods = getPreparedTodos(todos, { status, query });

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                sortedStatus={status}
                byStatus={setStatus}
                sortedQuery={query}
                byQuery={setQuery}
              />
            </div>

            <div className="block">
              {loader && <Loader />}

              {!loader && todos.length > 0 && (
                <TodoList
                  todos={visibleGoods}
                  selectedTodo={selectedTodo}
                  onSelect={setSelectedTodo}
                />
              )}

              {!loader && todos.length === 0 && 'No todos'}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal todo={selectedTodo} onCloseModal={setSelectedTodo} />
      )}
    </>
  );
};
