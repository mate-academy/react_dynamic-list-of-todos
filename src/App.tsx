/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { User } from './types/User';
import { getTodos, getUser } from './api';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [userLoading, setUserLoading] = useState(false);
  // prettier-ignore
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'completed'>('all');
  const [filterQuery, setFilterQuery] = useState('');
  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);

  useEffect(() => {
    const loadTodos = async () => {
      try {
        setLoading(true);
        const data = await getTodos();

        setTodos(data);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Failed to load todos', error);
      } finally {
        setLoading(false);
      }
    };

    loadTodos();
  }, []);

  const filteredTodos = todos
    .filter(todo => {
      if (filterStatus === 'active') {
        return !todo.completed;
      }

      if (filterStatus === 'completed') {
        return todo.completed;
      }

      return true;
    })
    .filter(todo =>
      todo.title.toLowerCase().includes(filterQuery.toLowerCase()),
    );

  const handleShowTodo = async (todo: Todo) => {
    setSelectedTodo(todo);
    setUserLoading(true);
    setSelectedTodoId(todo.id);
    try {
      const user = await getUser(todo.userId);

      setSelectedUser(user);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to load user: ', error);
      setSelectedUser(null);
    } finally {
      setUserLoading(false);
    }
  };

  const handleCloseModal = () => {
    setSelectedTodo(null);
    setSelectedUser(null);
    setSelectedTodoId(null);
  };

  const handleStatusChange = (status: 'all' | 'active' | 'completed') => {
    setFilterStatus(status);
  };

  const handleQueryChange = (query: string) => {
    setFilterQuery(query);
  };

  const handleClearQuery = () => {
    setFilterQuery('');
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                status={filterStatus}
                onStatusChange={handleStatusChange}
                query={filterQuery}
                onQueryChange={handleQueryChange}
                onClearQuery={handleClearQuery}
              />
            </div>

            <div className="block">
              {loading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  onShow={handleShowTodo}
                  selectedId={selectedTodoId}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          user={selectedUser}
          isLoading={userLoading}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};
