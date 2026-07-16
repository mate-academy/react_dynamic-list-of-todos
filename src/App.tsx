/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos, getUser } from './api';
import { User } from './types/User';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [status, setStatus] = useState<'all' | 'active' | 'completed'>('all');
  const [query, setQuery] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUserLoading, setIsUserLoading] = useState(false);

  const handleSelectTodo = (todo: Todo | null) => {
    setSelectedTodo(todo);

    if (todo) {
      setIsUserLoading(true);
    }
  };

  useEffect(() => {
    setIsLoading(true);

    getTodos()
      .then(allTodos => {
        setTodos(allTodos);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (selectedTodo === null) {
      return;
    }

    getUser(selectedTodo.userId)
      .then(ourUser => {
        setUser(ourUser);
      })
      .finally(() => {
        setIsUserLoading(false);
      });
  }, [selectedTodo]);

  const filteredTodos = todos.filter(todo => {
    if (todo.completed && status === 'active') {
      return false;
    }

    if (!todo.completed && status === 'completed') {
      return false;
    }

    const filteredQuery = query.toLocaleLowerCase().trim();

    if (
      filteredQuery &&
      !todo.title.toLocaleLowerCase().includes(filteredQuery)
    ) {
      return false;
    }

    return true;
  });

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                status={status}
                onStatusChange={setStatus}
                query={query}
                onQueryChange={setQuery}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  selectedTodoId={selectedTodo?.id || null}
                  onSelectTodo={handleSelectTodo}
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
          isLoading={isUserLoading}
          onClose={() => {
            setSelectedTodo(null);
            setUser(null);
          }}
        />
      )}
    </>
  );
};
