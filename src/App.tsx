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
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    setIsLoading(true);
    const todosFromApi = await getTodos();
    setTodos(todosFromApi);
    setFilteredTodos(todosFromApi);
    setIsLoading(false);
  };

  const handleStatusChange = (status: string) => {
    setStatusFilter(status);
    filterTodos(status, searchQuery);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    filterTodos(statusFilter, query);
  };

  const filterTodos = (status: string, query: string) => {
    let updatedTodos = todos;

    if (status !== 'all') {
      updatedTodos = todos.filter(todo =>
        status === 'completed' ? todo.completed : !todo.completed
      );
    }

    if (query) {
      updatedTodos = updatedTodos.filter(todo =>
        todo.title.toLowerCase().includes(query.toLowerCase())
      );
    }

    setFilteredTodos(updatedTodos);
  };

  const openTodoModal = async (todo: Todo) => {
    setIsLoading(true);
    const user = await getUser(todo.userId);
    setSelectedUser(user);
    setSelectedTodo(todo);
    setIsLoading(false);
  };

  const closeTodoModal = () => {
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
                statusFilter={statusFilter}
                searchQuery={searchQuery}
                onStatusChange={handleStatusChange}
                onSearchChange={handleSearchChange}
                onClearSearch={() => setSearchQuery('')}
              />
            </div>

            <div className="block">
              {isLoading ? <Loader /> : <TodoList todos={filteredTodos} onTodoSelect={openTodoModal} />}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && selectedUser && (
        <TodoModal
          todo={selectedTodo}
          user={selectedUser}
          onClose={closeTodoModal}
        />
      )}
    </>
  );
};
