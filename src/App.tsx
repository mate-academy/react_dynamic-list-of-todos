/* eslint-disable max-len */
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
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [filter, setFilter] = useState<string>('all');
  const [query, setQuery] = useState<string>('');

  useEffect(() => {
    const loadTodos = async () => {
      setLoading(true);
      const todosFromApi = await getTodos();

      setTodos(todosFromApi);
      setFilteredTodos(todosFromApi);
      setLoading(false);
    };

    loadTodos();
  }, []);

  useEffect(() => {
    const filtered = todos.filter(todo => {
      const matchesStatus =
        filter === 'all' ||
        (filter === 'completed' && todo.completed) ||
        (filter === 'active' && !todo.completed);
      const matchesQuery = todo.title
        .toLowerCase()
        .includes(query.toLowerCase());

      return matchesStatus && matchesQuery;
    });

    setFilteredTodos(filtered);
  }, [filter, query, todos]);

  const handleSelectTodo = async (todo: Todo) => {
    setLoading(true);
    const user = await getUser(todo.userId);

    setSelectedTodo(todo);
    setSelectedUser(user);
    setLoading(false);
  };

  const handleCloseModal = () => {
    setSelectedTodo(null);
    setSelectedUser(null);
  };

  const handleFilterChange = (status: string) => {
    setFilter(status);
  };

  const handleQueryChange = (newQuery: string) => {
    setQuery(newQuery);
  };

  const handleClearQuery = () => {
    setQuery('');
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filter={filter}
                query={query}
                onFilterChange={handleFilterChange}
                onQueryChange={handleQueryChange}
                onClearQuery={handleClearQuery}
              />
            </div>

            <div className="block">
              {loading && <Loader />}
              <TodoList todos={filteredTodos} onSelectTodo={handleSelectTodo} />
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && selectedUser && (
        <TodoModal
          todo={selectedTodo}
          user={selectedUser}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};
