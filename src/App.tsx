import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { Todo } from './types/Todo';
import { User } from './types/User';

import { getTodos, getUser } from './api';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const [isLoadingTodos, setIsLoadingTodos] = useState(false);

  const [status, setStatus] = useState<'all' | 'active' | 'completed'>('all');
  const [query, setQuery] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const [user, setUser] = useState<User | null>(null);
  const [isLoadingUser, setIsLoadingUser] = useState(false);

  useEffect(() => {
    setIsLoadingTodos(true);

    getTodos()
      .then(data => {
        setTodos(data);
      })
      .finally(() => {
        setIsLoadingTodos(false);
      });
  }, []);

  const visibleTodos = useMemo(() => {
    return todos
      .filter(todo => {
        if (status === 'active') {
          return !todo.completed;
        }

        if (status === 'completed') {
          return todo.completed;
        }

        return true;
      })
      .filter(todo => {
        return todo.title.toLowerCase().includes(query.toLowerCase());
      });
  }, [todos, status, query]);

  const handleSelectTodo = (todo: Todo) => {
    setSelectedTodo(todo);
    setIsModalOpen(true);
    setUser(null);

    setIsLoadingUser(true);
    getUser(todo.userId)
      .then(fetchedUser => {
        setUser(fetchedUser);
      })
      .finally(() => {
        setIsLoadingUser(false);
      });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTodo(null);
    setUser(null);
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
                status={status}
                query={query}
                onStatusChange={newStatus =>
                  setStatus(newStatus as 'all' | 'active' | 'completed')
                }
                onQueryChange={setQuery}
                onClearQuery={handleClearQuery}
              />
            </div>

            <div className="block">
              {isLoadingTodos && <Loader />}

              {!isLoadingTodos && (
                <TodoList
                  todos={visibleTodos}
                  selectedTodoId={selectedTodo ? selectedTodo.id : null}
                  onSelect={handleSelectTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <TodoModal
        isOpen={isModalOpen}
        todo={selectedTodo}
        user={user}
        isLoadingUser={isLoadingUser}
        onClose={handleCloseModal}
      />
    </>
  );
};
