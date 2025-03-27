/* eslint-disable max-len */
import React, { useEffect, useState, useCallback } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Todo } from './types/Todo';
import { User } from './types/User';
import { FilterStatus } from './types/FilterStatus';
import { getTodos, getUser } from './api';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [filter, setFilter] = useState<FilterStatus>(FilterStatus.All);
  const [searchQuery, setSearchQuery] = useState('');
  const [modalLoading, setModalLoading] = useState(false);

  useEffect(() => {
    const loadTodos = async () => {
      try {
        const loadedTodos = await getTodos();

        setTodos(loadedTodos);
      } finally {
        setLoading(false);
      }
    };

    loadTodos();
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedTodo(null);
    setSelectedUser(null);
  }, []);

  const handleShowTodo = useCallback(
    async (todo: Todo) => {
      if (selectedTodo?.id === todo.id) {
        handleCloseModal();
        return;
      }

      setSelectedTodo(todo);
      setModalLoading(true);
      try {
        const user = await getUser(todo.userId);
        setSelectedUser(user);
      } finally {
        setModalLoading(false);
      }
    },
    [handleCloseModal, selectedTodo?.id],
  );

  const filteredTodos = todos.filter(todo => {
    const matchesStatus =
      filter === FilterStatus.All
        ? true
        : filter === FilterStatus.Completed
          ? todo.completed
          : !todo.completed;

    const matchesSearch = todo.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  if (loading && !todos.length) {
    return <Loader />;
  }

  return (
    <div className="container">
      <h1>Todo List</h1>

      <TodoFilter
        filter={filter}
        onFilterChange={setFilter}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <TodoList
        todos={filteredTodos}
        onShowTodo={handleShowTodo}
        selectedTodoId={selectedTodo?.id}
      />

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          user={selectedUser!}
          onClose={handleCloseModal}
          loading={modalLoading}
        />
      )}
    </div>
  );
};
