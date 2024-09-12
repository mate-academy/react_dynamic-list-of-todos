import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import React, { useEffect, useState } from 'react';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos, getUser } from './api';
import { User } from './types/User';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchTodos = async () => {
      setLoading(true);
      try {
        const fetchedTodos = await getTodos();

        setTodos(fetchedTodos);
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  const handleStatusChange = (status: string) => {
    setStatusFilter(status);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const openModal = async (id: number) => {
    setSelectedTodoId(id);
    setIsModalOpen(true);

    setLoading(true);
    try {
      const todoItem = todos.find(todo => todo.id === id);

      if (todoItem) {
        const userDetails = await getUser(todoItem.userId);

        setUser(userDetails);
      }
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTodoId(null);
    setUser(null);
  };

  const filteredTodos = todos.filter(todo => {
    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'completed' && todo.completed) ||
      (statusFilter === 'active' && !todo.completed);

    const matchesQuery = todo.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

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
                onStatusChange={handleStatusChange}
                onSearchChange={handleSearchChange}
                onClearSearch={handleClearSearch}
                searchQuery={searchQuery}
              />
            </div>

            <div className="block">
              {loading && <Loader />}
              <TodoList
                todos={filteredTodos}
                onSelected={openModal}
                selectedTodoId={selectedTodoId}
              />
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && selectedTodoId !== null && (
        <TodoModal id={selectedTodoId} user={user} onClose={closeModal} />
      )}
    </>
  );
};
