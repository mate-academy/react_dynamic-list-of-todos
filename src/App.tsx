/* eslint-disable import/extensions */
/* eslint-disable no-console */
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import React, { useEffect, useState, useMemo } from 'react';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo.ts';
import { User } from './types/User.ts';
import * as api from './api.ts';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    const loadTodos = async () => {
      setIsLoading(true);
      try {
        const todosFromServer = await api.getTodos();

        setTodos(todosFromServer);
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };

    loadTodos();
  }, []);

  useEffect(() => {
    if (selectedTodo) {
      const loadUser = async () => {
        setUser(null);
        try {
          const userFromServer = await api.getUser(selectedTodo.userId);

          setUser(userFromServer);
        } catch (error) {}
      };

      loadUser();
    }
  }, [selectedTodo]);

  const handleShowTodo = (todo: Todo) => {
    setSelectedTodo(todo);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTodo(null);
    setUser(null);
  };

  const visibleTodos = useMemo(() => {
    return todos
      .filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()))
      .filter(todo => {
        switch (filterStatus) {
          case 'completed':
            return todo.completed;
          case 'active':
            return !todo.completed;
          default:
            return true;
        }
      });
  }, [todos, query, filterStatus]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                setQuery={setQuery}
                filterStatus={filterStatus}
                setFilterStatus={setFilterStatus}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={visibleTodos}
                  onShowTodo={handleShowTodo}
                  selectedTodo={selectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <TodoModal
          todo={selectedTodo}
          user={user}
          onClose={handleCloseModal}
          isLoadingUser={user === null}
        />
      )}
    </>
  );
};
