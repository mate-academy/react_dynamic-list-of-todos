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

type Filter = 'all' | 'active' | 'completed';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [user, setUser] = useState<User | null>(null); //прибрав масив, але не знаю чи правильно
  const [isLoadingUser, setIsLoadingUser] = useState(false);
  const [filterStatus, setFilterStatus] = useState<Filter>('all');
  const [query, setQuery] = useState('');

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(setTodos)
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    if (selectedTodo !== null) {
      setIsLoadingUser(true);
      getUser(selectedTodo.userId)
        .then(setUser)
        .finally(() => setIsLoadingUser(false));
    }
  }, [selectedTodo]);

  const visibleTodos = todos.filter(todo => {
    const filteredQuery = todo.title
      .toLowerCase()
      .includes(query.toLowerCase());
    const filteredFilter =
      filterStatus === 'all'
        ? true
        : filterStatus === 'active'
          ? !todo.completed
          : todo.completed;

    return filteredQuery && filteredFilter;
  });

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filter={filterStatus} //сюди питання
                query={query}
                onFilterChange={setFilterStatus}
                onQueryChange={setQuery}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={visibleTodos}
                  onSelectedTodo={setSelectedTodo}
                  selectedTodo={selectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {selectedTodo !== null && (
        <TodoModal
          todo={selectedTodo}
          user={user}
          isLoadingUser={isLoadingUser}
          isClosed={() => setSelectedTodo(null)}
        />
      )}
    </>
  );
};
