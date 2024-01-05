/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Todo } from './types/Todo';
import { User } from './types/User';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isUserLoading, setIsUserLoading] = useState(false);
  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);

  const fetchUserDetails = async (userId: number): Promise<User> => {
    setIsUserLoading(true);
    const response = await fetch(`https://mate-academy.github.io/react_dynamic-list-of-todos/api/users/${userId}.json`);

    if (!response.ok) {
      setIsUserLoading(false);
      throw new Error('Failed to fetch user details');
    }

    const userData = await response.json();

    setIsUserLoading(false);

    return userData;
  };

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then((data: Todo[]) => {
        setTodos(data);
        setFilteredTodos(data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    const filtered = todos.filter(todo => {
      return (filterStatus === 'all' || (filterStatus === 'completed' ? todo.completed : !todo.completed))
      && todo.title.toLowerCase().includes(searchQuery.toLowerCase());
    });

    setFilteredTodos(filtered);
  }, [todos, filterStatus, searchQuery]);

  const handleSelectTodo = async (todo: Todo) => {
    setSelectedTodo(todo);
    setIsModalOpen(true);
    setSelectedTodoId(todo.id);
    try {
      const userData = await fetchUserDetails(todo.userId);

      setSelectedUser(userData);
    } catch (error) {
      // eslint-disable-next-line
      console.error('Error fetching user details:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTodo(null);
  };

  const handleFilterChange = (status: string, query: string) => {
    setFilterStatus(status);
    setSearchQuery(query);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter onFilterChange={handleFilterChange} />
            </div>

            {isLoading || isUserLoading ? (
              <Loader data-cy="loader" />
            ) : (
              <div className="block">
                <TodoList
                  todos={filteredTodos}
                  onSelectTodo={handleSelectTodo}
                  selectedTodoId={selectedTodoId}
                  setSelectedTodoId={setSelectedTodoId}
                />
                {selectedTodo && (
                  <TodoModal
                    todo={selectedTodo}
                    user={selectedUser}
                    isLoading={isLoading}
                    onClose={() => setSelectedTodo(null)}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <TodoModal
          todo={selectedTodo}
          user={selectedUser}
          onClose={handleCloseModal}
          isLoading={false}
        />
      )}
    </>
  );
};

export default App;
