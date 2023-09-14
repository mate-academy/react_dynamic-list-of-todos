/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { FILTER } from './types/Filter';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loader, setLoader] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [filter, setFilter] = useState<string>(FILTER.ALL);
  const [query, setQuery] = useState('');

  useEffect(() => {
    setLoader(true);
    getTodos()
      .then(setTodos)
      .catch(() => {
        setTodos([]);
        throw new Error('Server is not responding');
      })
      .finally(() => setLoader(false));
  }, []);

  const filteredByQueryTodos: Todo[] = useMemo(() => {
    return todos
      .filter((todo => todo.title.toLowerCase().includes(query.toLowerCase())));
  }, [todos, query]);

  const visiableTodos: Todo[] = useMemo(() => {
    switch (filter) {
      case FILTER.ACTIVE:
        return filteredByQueryTodos.filter((todo => todo.completed));

      case FILTER.COMPLETED:
        return filteredByQueryTodos.filter((todo => !todo.completed));

      case FILTER.ALL:
      default:
        return filteredByQueryTodos;
    }
  }, [filter, filteredByQueryTodos]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter setFilter={setFilter} query={query} setQuery={setQuery} />
            </div>

            <div className="block">
              {loader
                ? <Loader />
                : <TodoList todos={visiableTodos} setSelectedTodo={setSelectedTodo} selectedTodo={selectedTodo} />}
            </div>
          </div>
        </div>
      </div>

      {!loader && selectedTodo
        && <TodoModal todo={selectedTodo} setSelectedTodo={setSelectedTodo} />}
    </>
  );
};
