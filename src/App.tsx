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

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModalId, setShowModalId] = useState<number | null>(null);
  const [openTodoId, setOpenTodoId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isUserLoading, setIsUserLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const selectedTodo =
    showModalId !== null
      ? todos.find(todo => todo.id === showModalId) || null
      : null;

  const openModal = (id: number) => {
    setShowModalId(id);
    setOpenTodoId(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setOpenTodoId(null);
    setIsModalOpen(false);
  };

  const updateStatusFilter = (status: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(status.target.value);
  };

  const handleSearchInputChange = (
    query: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSearchQuery(query.target.value);
  };

  useEffect(() => {
    if (showModalId) {
      const todo = todos.find(t => t.id === showModalId);

      if (todo) {
        setIsUserLoading(true);
        getUser(todo.userId).then(userData => {
          setUser(userData);
          setIsUserLoading(false);
        });
      }
    } else {
      setUser(null);
    }
  }, [showModalId, todos]);

  useEffect(() => {
    getTodos()
      .then(data => {
        setTodos([...data]);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
        throw new Error('Data not loaded');
      });
  }, []);

  useEffect(() => {
    let filteredList = [...todos];

    switch (statusFilter) {
      case 'all':
        filteredList = [...todos];
        break;
      case 'active':
        filteredList = todos.filter(todo => todo.completed === false);
        break;
      case 'completed':
        filteredList = todos.filter(todo => todo.completed === true);
        break;
    }

    if (searchQuery) {
      filteredList = filteredList.filter(todo =>
        todo.title
          .toLocaleLowerCase()
          .includes(searchQuery.toLocaleLowerCase()),
      );
    }

    setFilteredTodos([...filteredList]);
  }, [statusFilter, searchQuery, todos]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                statusFilter={statusFilter}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                onStatusChange={updateStatusFilter}
                onSearchInputChange={handleSearchInputChange}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}
              <TodoList
                todos={filteredTodos}
                openModal={openModal}
                openTodoId={openTodoId}
              />
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <TodoModal
          todo={selectedTodo}
          closeModal={closeModal}
          user={user}
          isUserLoading={isUserLoading}
        />
      )}
    </>
  );
};
