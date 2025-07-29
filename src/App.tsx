/* eslint-disable max-len */
import { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Todo } from './types/Todo';
import { User } from './types/User';
import { getTodos, getActiveTodos, getCompletedTodos, getUser } from './api';
import { Loader } from './components/Loader';
import { TodoModal } from './components/TodoModal';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const loadTodos = async (loadFn: () => Promise<Todo[]>) => {
    setLoading(true);
    setErrorMessage('');
    try {
      const data = await loadFn();

      setTodos(data);
    } catch {
      setErrorMessage('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const loadUser = async (userId: number) => {
    setLoading(true);
    setErrorMessage('');
    try {
      const data = await getUser(userId);

      setUser(data);
    } catch {
      setErrorMessage('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const openModalWithUser = (todo: Todo | null) => {
    setSelectedTodo(todo);
    setIsModalOpen(true);
  };

  const handleFilterChange = (filter: 'all' | 'active' | 'completed') => {
    if (filter === 'active') {
      loadTodos(getActiveTodos);
    } else if (filter === 'completed') {
      loadTodos(getCompletedTodos);
    } else {
      loadTodos(getTodos);
    }
  };

  const filteredTodos = todos.filter(todo =>
    todo.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setUser(null);
    setSelectedTodo(null);
  };

  useEffect(() => {
    loadTodos(getTodos);
  }, []);

  useEffect(() => {
    if (selectedTodo && selectedTodo.id !== null) {
      loadUser(selectedTodo.userId);
    }
  }, [selectedTodo]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onChange={handleFilterChange}
                searchQuery={searchQuery}
                onSearchBarChange={handleSearchChange}
              />
            </div>

            <div className="block">
              {loading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  onOpenModal={openModalWithUser}
                  selectedTodo={selectedTodo}
                />
              )}
              {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <TodoModal user={user} onCloseModal={closeModal} todo={selectedTodo} />
      )}
    </>
  );
};
