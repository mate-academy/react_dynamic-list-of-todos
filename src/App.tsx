/* eslint-disable no-console */
/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos, getUser } from './api';
import { Todo } from './types/Todo';
import { User } from './types/User';
import { ParamsKeys } from './types/FilterParams';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [cardIsWatching, setCardIsWatching] = useState<Todo | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [filterParam, setFilterParam] = useState<ParamsKeys>('all');
  const [query, setQuery] = useState('');

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then(data => setTodos(data))
      .catch(error => {
        console.error(error);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (cardIsWatching) {
      setLoading(true);
      getUser(cardIsWatching.userId)
        .then(setSelectedUser)
        .catch(error => console.error(error))
        .finally(() => setLoading(false));
    }
  }, [cardIsWatching]);

  const handleWatchCard = (card: Todo) => {
    setCardIsWatching(card);
  };

  const handleCloseCard = () => {
    setCardIsWatching(null);
  };

  const filteredTodos = todos.filter(todo => {
    const matchesStatus =
      filterParam === 'all' ||
      (filterParam === 'active' && !todo.completed) ||
      (filterParam === 'completed' && todo.completed);

    const matchesQuery = todo.title
      .toLowerCase()
      .includes(query.toLowerCase().trim());

    return matchesStatus && matchesQuery;
  });

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filterParam={filterParam}
                setFilterParam={setFilterParam}
                query={query}
                setQuery={setQuery}
              />
            </div>

            <div className="block">
              {loading && !cardIsWatching ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  onWatchCard={handleWatchCard}
                  watchedTodoId={cardIsWatching?.id ?? null}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <TodoModal
        isLoading={loading}
        card={cardIsWatching}
        user={selectedUser}
        onCloseCard={handleCloseCard}
      />
    </>
  );
};
