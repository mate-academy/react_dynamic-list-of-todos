/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { fetchPostsFromTodos } from './services/fetchDataFromTodos';
import { StatusFilter, Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[] | []>([]);
  const [error, setError] = useState<string | null>(null);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const [updateAt, setUpdateAt] = useState<Date>(new Date());
  const [selectedPosts, setSelectedPosts] = useState<Todo | null>(null);

  function reload() {
    setUpdateAt(new Date());
    setError(null);
  }

  const visibleTodos = todos.filter(todo => {
    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'active' && !todo.completed) ||
      (statusFilter === 'completed' && todo.completed);

    const matchesSearch = todo.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  useEffect(() => {
    setLoadingPosts(true);

    fetchPostsFromTodos()
      .then(data => {
        setTodos(data);
      })
      .catch(() => setError('Request failed'))
      .finally(() => {
        setLoadingPosts(false);
      });
  }, [updateAt]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
            </div>

            <div className="block">
              {loadingPosts && <Loader />}
              {!loadingPosts && todos.length > 0 && (
                <TodoList
                  todos={visibleTodos}
                  onSelect={setSelectedPosts}
                  selectedPosts={selectedPosts}
                />
              )}
              {!loadingPosts && !error && todos.length === 0 && (
                <p className="title is-5">There are no users</p>
              )}
              {error && (
                <p className="notification is-danger">
                  {error}
                  <button onClick={reload}>Reload</button>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {loadingPosts ? (
        <div className="modal is-active" data-cy="modal">
          <div className="modal-background" />
          <Loader />
        </div>
      ) : selectedPosts ? (
        <TodoModal
          todos={selectedPosts}
          onClose={() => setSelectedPosts(null)}
        />
      ) : null}
    </>
  );
};
