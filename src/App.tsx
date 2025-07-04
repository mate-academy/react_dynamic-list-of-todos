import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { getTodos, getUser } from './api';
import { Todo } from './types/Todo';
import { User } from './types/User';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  /* eslint-disable @typescript-eslint/indent */
  const [statusFilter, setStatusFilter] = useState<
    'all' | 'active' | 'completed'
  >('all');
  const [searchQuery, setSearchQuery] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isUserLoading, setIsUserLoading] = useState(false);
  /* eslint-enable @typescript-eslint/indent */

  useEffect(() => {
    getTodos()
      .then(data => setTodos(data))
      // eslint-disable-next-line no-console
      .catch(error => console.error(error))
      .finally(() => setIsLoading(false));
  }, []);

  const filteredTodos = todos.filter(todo => {
    if (statusFilter === 'active' && todo.completed) {
      return false;
    }

    if (statusFilter === 'completed' && !todo.completed) {
      return false;
    }

    if (!todo.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }

    return true;
  });

  const openModal = (todo: Todo) => {
    setSelectedTodo(todo);
    setIsModalOpen(true);
    setIsUserLoading(true);
    getUser(todo.userId)
      .then(user => setSelectedUser(user))
      .catch(() => setSelectedUser(null))
      .finally(() => setIsUserLoading(false));
  };

  const closeModal = () => {
    setIsModalOpen(false);
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
                onStatusChange={e =>
                  setStatusFilter(
                    e.target.value as 'all' | 'active' | 'completed',
                  )
                }
                search={searchQuery}
                onSearchChange={e => setSearchQuery(e.target.value)}
                onClearSearch={() => setSearchQuery('')}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  onSelect={openModal}
                  selectedTodoId={selectedTodo ? selectedTodo.id : null}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <TodoModal
        isOpen={isModalOpen}
        isLoading={isUserLoading}
        todo={selectedTodo}
        user={selectedUser}
        onClose={closeModal}
      />
    </>
  );
};
