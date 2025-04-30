/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from 'types/Todo';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState<string | null>(null);

  const [onSelectTodo, setOnSelectTodo] = useState<Todo | null>(null);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then(setTodos)
      .catch(err => {
        setIsError(err.message || 'Something went wrong');
      })
      .finally(() => setLoading(false));
  }, []);

  const filteredTodos = todos.filter(todo => {
    const selectFilter =
      filter === 'all' ||
      (filter === 'completed' && todo.completed) ||
      (filter === 'active' && !todo.completed);

    const selectSearch = todo.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    return selectFilter && selectSearch;
  });

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filter={filter}
                filterChange={setFilter}
                searchQuery={searchQuery}
                searchQueryChange={setSearchQuery}
              />
            </div>

            <div className="block">
              {loading ? (
                <Loader />
              ) : isError ? ( // помилка
                <div className="notification is-danger">{isError}</div>
              ) : (
                <TodoList
                  todos={filteredTodos}
                  currentlySelectedTodoId={onSelectTodo?.id || null}
                  onTodoSelect={setOnSelectTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {onSelectTodo && (
        <TodoModal todo={onSelectTodo} onClose={() => setOnSelectTodo(null)} />
      )}
    </>
  );
};
