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

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isUserLoading, setIsUserLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(todosFromServer => {
        setTodos(todosFromServer);
        setFilteredTodos(todosFromServer);
      })
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    let updated = [...todos];

    if (statusFilter === 'active') {
      updated = updated.filter(todo => !todo.completed);
    } else if (statusFilter === 'completed') {
      updated = updated.filter(todo => todo.completed);
    }

    if (searchQuery) {
      updated = updated.filter(todo =>
        todo.title.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    setFilteredTodos(updated);
  }, [statusFilter, searchQuery, todos]);

  const handleSelectTodo = (todo: Todo) => {
    setSelectedTodo(todo);
    setIsUserLoading(true);
    getUser(todo.userId)
      .then(setSelectedUser)
      .finally(() => setIsUserLoading(false));
  };

  const handleCloseModal = () => {
    setSelectedTodo(null);
    setSelectedUser(null);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                status={statusFilter}
                query={searchQuery}
                onStatusChange={setStatusFilter}
                onQueryChange={setSearchQuery}
                onClearQuery={() => setSearchQuery('')}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  selectedTodo={selectedTodo}
                  todos={filteredTodos}
                  onSelect={handleSelectTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          user={selectedUser}
          isLoading={isUserLoading}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};
