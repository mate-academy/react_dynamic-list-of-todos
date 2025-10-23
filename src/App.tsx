/* eslint-disable no-console */
/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Todo } from './types/Todo';
import { getTodos, getUser } from './api';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { User } from './types/User';

type Status = 'all' | 'active' | 'completed';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isUserLoading, setIsUserLoading] = useState<boolean>(false);
  const [query, setQuery] = useState<string>('');
  const [status, setStatus] = useState<Status>('all');
  const [user, setUser] = useState<User | null>(null);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    setIsLoading(true);

    getTodos()
      .then(receivedTodos => {
        setTodos(receivedTodos);
      })
      .catch(console.error)
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const filterTodos = todos
    .filter(todo => {
      if (status === 'active') {
        return !todo.completed;
      }

      if (status === 'completed') {
        return todo.completed;
      }

      return true;
    })
    .filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()));

  const onChangeQuery = (newQuery: string) => {
    setQuery(newQuery);
  };

  const onClearQuery = () => {
    setQuery('');
  };

  const onChangeStatus = (newStatus: Status) => {
    setStatus(newStatus);
  };

  const handleTodoSelect = (todo: Todo) => {
    setIsUserLoading(true);
    setSelectedTodo(todo);

    getUser(todo.userId)
      .then(receivedUser => {
        setUser(receivedUser);
      })
      .catch(console.error)
      .finally(() => {
        setIsUserLoading(false);
      });
  };

  const handleCloseModal = () => {
    setSelectedTodo(null);
    setUser(null);
    setIsUserLoading(false);
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
                onChangeQuery={onChangeQuery}
                onClearQuery={onClearQuery}
                onChangeStatus={onChangeStatus}
              />
            </div>

            <div className="block">
              <Loader isLoading={isLoading} />
              <TodoList
                todos={filterTodos}
                onTodoSelect={handleTodoSelect}
                selectedTodo={selectedTodo}
              />
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          user={user}
          isLoading={isUserLoading}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};
