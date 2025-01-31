/* eslint-disable no-console */
/* eslint-disable import/extensions */
/* eslint-disable padding-line-between-statements */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { getTodos, getUser } from './api';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { User } from './types/User';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [filter, setFilter] = useState({ status: 'all', query: '' });

  useEffect(() => {
    const loadTodos = async () => {
      setIsLoading(true);
      try {
        const fetchedTodos = await getTodos();
        setTodos(fetchedTodos);
        setFilteredTodos(fetchedTodos);
      } catch (error) {
        console.error('Failed to load todos:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadTodos();
  }, []);

  useEffect(() => {
    const filtered = todos.filter(todo => {
      const matchesStatus = filter.status === 'all' ||
        (filter.status === 'completed' && todo.completed) ||
        (filter.status === 'active' && !todo.completed);
      const matchesQuery = todo.title.toLowerCase().includes(filter.query.toLowerCase());
      return matchesStatus && matchesQuery;
    });
    setFilteredTodos(filtered);
  }, [todos, filter]);

  const handleFilterChange = (newFilter: typeof filter) => {
    setFilter(newFilter);
  };

  const handleTodoSelect = async (todo: Todo | null) => {
    if (todo && (!selectedTodo || todo.id !== selectedTodo.id)) {
      setSelectedTodo(todo);
      setIsLoading(true);
      try {
        const user = await getUser(todo.userId);
        setSelectedUser(user);
      } catch (error) {
        console.error('Failed to load user:', error);
      } finally {
        setIsLoading(false);
      }
    } else {
      setSelectedTodo(null);
      setSelectedUser(null);
    }
  };

  const handleModalClose = () => {
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
              <TodoFilter onFilterChange={handleFilterChange} filter={filter} />
            </div>
            <div className="block">
              {isLoading && !selectedTodo && <Loader />}
              <TodoList
                todos={filteredTodos}
                onTodoSelect={handleTodoSelect}
                selectedTodoId={selectedTodo?.id ?? null}
              />
            </div>
          </div>
        </div>
      </div>
      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          user={selectedUser}
          onClose={handleModalClose}
          isLoading={isLoading}
        />
      )}
    </>
  );
};



