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
import { Status } from './components/modifiers/Status';

interface FilterParams {
  status: string;
  query: string;
}

function getFilteredTodos(todos: Todo[], { status, query }: FilterParams) {
  let filteredTodos = [...todos];
  const niceQuery = query.toLowerCase().trim();

  switch (status) {
    case Status.ACTIVE:
      filteredTodos = todos.filter(todo => !todo.completed);
      break;

    case Status.COMPLETE:
      filteredTodos = todos.filter(todo => todo.completed);
      break;

    default:
      break;
  }

  if (niceQuery) {
    return filteredTodos.filter(todo =>
      todo.title.toLowerCase().includes(niceQuery),
    );
  }

  return filteredTodos;
}

export const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);

  const [query, setQuery] = useState('');
  const [status, setStatus] = useState(Status.ALL);

  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const filteredTodos = getFilteredTodos(todos, { status, query });

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then(setTodos)
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setStatus={setStatus}
                query={query}
                setQuery={setQuery}
              />
            </div>

            <div className="block">
              {loading && <Loader />}
              {!loading && !!todos.length && (
                <TodoList
                  todos={filteredTodos}
                  setSelected={setSelectedTodo}
                  selected={selectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {selectedTodo && (
        <TodoModal setSelected={setSelectedTodo} selected={selectedTodo} />
      )}
    </>
  );
};
