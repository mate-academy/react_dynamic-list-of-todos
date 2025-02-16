/* eslint-disable max-len */
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import React, { useEffect, useState } from 'react';

import { getTodos } from './api';

import { SortType, Todo } from './types';

import { filterByStatus, todoMatchesQuery } from './service';

import { TodoList, TodoFilter, TodoModal, Loader } from './components';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedUser, setSelectedUser] = useState<Todo | null>(null);
  const [query, setQuery] = useState('');
  const [sortQuery, setSortQuery] = useState<SortType>(SortType.All);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .finally(() => setIsLoading(false));
  }, []);

  const filteredTodos = todos.filter(
    (todo: Todo) =>
      todoMatchesQuery(query, todo.title) &&
      filterByStatus(todo.completed, sortQuery),
  );

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                onSelect={setSortQuery}
                onQueryChange={setQuery}
                onClear={() => setQuery('')}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  selectedUser={selectedUser}
                  openTodoModal={setSelectedUser}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedUser && (
        <TodoModal todo={selectedUser} onClose={() => setSelectedUser(null)} />
      )}
    </>
  );
};
