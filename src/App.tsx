/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { User } from './types/User';
import { getTodos, getUser } from './api';

type TodoStatus = 'all' | 'active' | 'completed';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const [loadingTodos, setLoadingTodos] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const [statusFilter, setStatusFilter] = useState<TodoStatus>('all');
  const [query, setQuery] = useState('');

  const [user, setUser] = useState<User | null>(null);
  const [loadingUser, setLoadingUser] = useState(false);

  useEffect(() => {
    setLoadingTodos(true);
    getTodos()
      .then((fetchedTodos: Todo[]) => setTodos(fetchedTodos))
      .finally(() => setLoadingTodos(false));
  }, []);

  const handleCloseModal = () => {
    setSelectedTodo(null);
    setUser(null);
  };

  const filteredTodos = todos.filter(todo => {
    if (statusFilter === 'active' && todo.completed) {
      return false;
    }

    if (statusFilter === 'completed' && !todo.completed) {
      return false;
    }

    if (!todo.title.toLowerCase().includes(query.toLowerCase())) {
      return false;
    }

    return true;
  });

  const handleStatusChange = (newStatus: TodoStatus) => {
    setStatusFilter(newStatus);
  };

  const handleQueryChange = (newQuery: string) => {
    setQuery(newQuery);
  };

  const handleClearQuery = () => {
    setQuery('');
  };

  const handleSelectTodo = (todo: Todo) => {
    setSelectedTodo(todo);
    setLoadingUser(true);

    getUser(todo.userId)
      .then(setUser)
      .finally(() => setLoadingUser(false));
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                statusFilter={statusFilter}
                query={query}
                onStatusChange={handleStatusChange}
                onQueryChange={handleQueryChange}
                onClearQuery={handleClearQuery}
              />
            </div>

            <div className="block">
              {loadingTodos && <Loader />}
              <TodoList
                todos={filteredTodos}
                selectedTodo={selectedTodo}
                onSelectTodo={handleSelectTodo}
              />
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          user={user}
          loadingUser={loadingUser}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};
