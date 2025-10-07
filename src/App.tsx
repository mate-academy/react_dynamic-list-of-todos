/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos, getUser } from './api'; // вместо getAllTodos и getUserById
export interface Todo {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}

export interface User {
  id: number;
  name: string;
  email: string;
}

type StatusFilter = 'all' | 'active' | 'completed';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [loadingTodos, setLoadingTodos] = useState(true);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [loadingUser, setLoadingUser] = useState(false);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [user, setUser] = useState<User | null>(null);

  // Загрузка всех todos
  useEffect(() => {
    const fetchTodos = async () => {
      setLoadingTodos(true);
      const data = await getTodos(); // было getAllTodos

      setTodos(data);
      setFilteredTodos(data);
      setLoadingTodos(false);
    };

    fetchTodos();
  }, []);

  // Фильтрация todos по статусу и поиску
  useEffect(() => {
    let result = todos;

    if (statusFilter !== 'all') {
      result = result.filter(todo =>
        statusFilter === 'completed' ? todo.completed : !todo.completed,
      );
    }

    if (searchQuery) {
      result = result.filter(todo =>
        todo.title.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    setFilteredTodos(result);
  }, [todos, statusFilter, searchQuery]);

  // Выбор todo и загрузка пользователя
  const handleSelectTodo = async (todo: Todo) => {
    setSelectedTodo(todo);
    setLoadingUser(true);
    const userData = await getUser(todo.userId); // было getUserById

    setUser(userData);
    setLoadingUser(false);
  };

  // Закрытие модалки
  const handleCloseModal = () => {
    setSelectedTodo(null);
    setUser(null);
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
                onStatusChange={setStatusFilter}
                query={searchQuery}
                onQueryChange={setSearchQuery}
                onClear={() => setSearchQuery('')}
              />
            </div>

            <div className="block">
              {loadingTodos ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  onSelect={handleSelectTodo}
                  selectedTodoId={selectedTodo?.id}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          user={user}
          loadingUser={loadingUser}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};
