/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos, getUser } from './api';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [allTodos, setAllTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [query, setQuery] = useState('');
  const [selectedTodo, setSelectedTodo] = useState();
  const [selectedUser, setSelectedUser] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onTodoSelect = (todo: Todo) => {
  setSelectedTodo(todo);
  setSelectedUser(null); // clear previous user
  setIsModalOpen(true);

  getUser(todo.userId).then(user => {
    setSelectedUser(user);
  });
};


  // eslint-disable-next-line @typescript-eslint/no-shadow
  const applyFilters = (todos: Todo[], query: string, status: string) => {
    return todos.filter(todo => {
      const matchesQuery = todo.title
        .toLowerCase()
        .includes(query.toLowerCase());

      let matchesStatus = true;

      if (status === 'completed') {
        matchesStatus = todo.completed;
      } else if (status === 'active') {
        matchesStatus = !todo.completed;
      }

      return matchesQuery && matchesStatus;
    });
  };

  const onStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;

    setStatusFilter(value);

    setFilteredTodos(applyFilters(allTodos, query, value));
  };

  const onClear = () => {
    setQuery('');
  }

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setQuery(value);

    setFilteredTodos(applyFilters(allTodos, value, statusFilter));
  };

  const closeModal = () => {
  setIsModalOpen(false);
  setSelectedTodo(null);
};


  useEffect(() => {
    setLoading(true);
    getTodos()
      .then(response => response)
      .then(todosList => {
        setAllTodos(todosList);
        setFilteredTodos(todosList);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    setFilteredTodos(applyFilters(allTodos, query, statusFilter));
  }, [allTodos, query, statusFilter]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onStatusChange={onStatusChange}
                onSearchChange={onSearchChange}
                onClear={onClear}
                query={query}
              />
            </div>

            <div className="block">
              {loading && <Loader />}
              <TodoList
  todos={filteredTodos}
  onTodoSelect={onTodoSelect}
  onTodoDeselect={() => setIsModalOpen(false)}
  selectedTodo={selectedTodo}
/>

            </div>
          </div>
        </div>
      </div>

      {isModalOpen && selectedTodo && (
  <TodoModal
    todo={selectedTodo}
    user={selectedUser}
    onClose={closeModal}
    loadingUser={!selectedUser}
  />
)}

    </>
  );
};
