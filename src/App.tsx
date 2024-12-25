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

type Params = {
  query: string;
  filter: string;
};

function filterTodos(list: Todo[], params: Params) {
  const { query, filter } = params;
  let result: Todo[] = [];

  if (filter) {
    switch (filter) {
      case 'all':
        result = list;
        break;

      case 'active':
        result = list.filter((todo: Todo) => !todo.completed);
        break;

      case 'completed':
        result = list.filter((todo: Todo) => todo.completed);
        break;

      default:
        result = list;
        break;
    }
  }

  if (query) {
    result = result.filter((todo: Todo) =>
      todo.title.toLowerCase().includes(query.toLowerCase()),
    );
  }

  return result;
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);

  const [select, setSelect] = useState(0);

  const [filter, setFilter] = useState('All');
  const [query, setQuery] = useState('');

  useEffect(() => {
    setLoading(true);

    getTodos()
      .then(todosFromServer => setTodos(todosFromServer))
      .finally(() => setLoading(false));
  }, []);

  const visibleTodos = filterTodos(todos, { query, filter });

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setFilter={setFilter}
                query={query}
                setQuery={setQuery}
              />
            </div>

            <div className="block">
              {loading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={visibleTodos}
                  select={select}
                  setSelect={setSelect}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {select !== 0 && (
        <TodoModal todos={todos} select={select} setSelect={setSelect} />
      )}
    </>
  );
};
