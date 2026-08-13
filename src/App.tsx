/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos, getUser } from './api';
import { User } from './types/User';

type Status = 'all' | 'active' | 'completed';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [user, setUser] = useState<User | null>(null);

  const [loadingTodos, setLoadingTodos] = useState<boolean>(true);
  const [loadingUsers, setLoadingUsers] = useState<boolean>(false);

  const [query, setQuery] = useState<string>('');

  const [selectedStatus, setSelectedStatus] = useState<Status>('all');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const filteredTodos = todos.filter(todo => {
    const matchesQuery = todo.title.toLowerCase().includes(query.toLowerCase());

    switch (selectedStatus) {
      case 'all':
        return matchesQuery;

      case 'active':
        return !todo.completed && matchesQuery;

      case 'completed':
        return todo.completed && matchesQuery;

      default:
        return false;
    }
  });

  useEffect(() => {
    getTodos().then(todo => {
      setTodos(todo);
      setLoadingTodos(false);
    });
  }, []);

  useEffect(() => {
    if (selectedTodo === null) {
      return;
    }

    setUser(null);
    setLoadingUsers(true);

    getUser(selectedTodo.userId).then(fetchedUser => {
      setUser(fetchedUser);
      setLoadingUsers(false);
    });
  }, [selectedTodo]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setSelectedStatus={setSelectedStatus}
                setQuery={setQuery}
                query={query}
              />
            </div>

            <div className="block">
              {loadingTodos && <Loader />}
              {!loadingTodos && (
                <TodoList
                  todos={filteredTodos}
                  setSelectedTodo={setSelectedTodo}
                  selectedTodo={selectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          setSelectedTodo={setSelectedTodo}
          user={user}
          loadingUsers={loadingUsers}
        />
      )}
    </>
  );
};
