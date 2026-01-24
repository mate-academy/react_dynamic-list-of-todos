/* eslint-disable max-len */
import React, { useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos, getUser } from './api';
import { Todo } from './types/Todo';
import { User } from './types/User';
import { AddTodo } from './components/AddTodo';

export const App: React.FC = () => {
  const [todos, setTodos] = React.useState<Todo[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [selectedTodoId, setSelectedTodoId] = React.useState<number | null>(
    null,
  );
  // eslint-disable-next-line prettier/prettier
  const [statusFilter, setStatusFilter] = React.useState<'all' | 'active' | 'completed'>('all');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedUser, setSelectedUser] = React.useState<User | null>(null);
  const [isLoadingUser, setIsLoadingUser] = React.useState(false);

  // Load todos on component mount
  useEffect(() => {
    setIsLoading(true);
    getTodos().then(data => {
      setTodos(data);
      setIsLoading(false);
    });
  }, []);

  // Load user when selected todo changes
  useEffect(() => {
    if (selectedTodoId !== null) {
      const selected = todos.find(todo => todo.id === selectedTodoId);

      if (selected) {
        setIsLoadingUser(true);
        getUser(selected.userId).then(user => {
          setSelectedUser(user);
          setIsLoadingUser(false);
        });
      }
    }
  }, [selectedTodoId, todos]);

  const selectedTodo = todos.find(todo => todo.id === selectedTodoId);

  // Filter todos by status and search query
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

  const handleStatusChange = (value: 'all' | 'active' | 'completed') => {
    setStatusFilter(value);
  };

  const handleQueryChange = (value: string) => {
    setSearchQuery(value);
  };

  const handleClearQuery = () => {
    setSearchQuery('');
  };

  const handleSelectTodo = (todoId: number) => {
    setSelectedTodoId(todoId);
  };

  const handleCloseModal = () => {
    setSelectedTodoId(null);
    setSelectedUser(null);
  };

  const handleAddTodo = (newTodo: Todo) => {
    setTodos(prevTodos => [...prevTodos, newTodo]);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <AddTodo todoLength={todos.length} onAddTodo={handleAddTodo} />

            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={searchQuery}
                statusFilter={statusFilter}
                onStatusChange={handleStatusChange}
                onQueryChange={handleQueryChange}
                onClearQuery={handleClearQuery}
              />
            </div>

            <div className="block">
              {isLoading ? <Loader /> : null}
              {!isLoading && (
                <TodoList
                  todos={filteredTodos}
                  selectedTodoId={selectedTodoId}
                  onSelectTodo={handleSelectTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodoId !== null && (
        <TodoModal
          todo={selectedTodo}
          user={selectedUser}
          isLoadingUser={isLoadingUser}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};
