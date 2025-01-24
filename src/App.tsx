import React, { useEffect, useMemo, useState } from 'react';
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
  const [query, setQuery] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);
  const [status, setStatus] = useState<'all' | 'active' | 'completed'>('all');

  useEffect(() => {
    setIsLoading(true);

    getTodos()
      .then(setTodos)
      .catch(error => {
        /* eslint no-console: ["error", { allow: ["warn", "error"] }] */
        console.error('Error fetching todos:', error);
      })
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    if (selectedTodo) {
      setIsLoading(true);
      getUser(selectedTodo.userId)
        .then(setSelectedUser)
        .catch(error => {
          /* eslint no-console: ["error", { allow: ["warn", "error"] }] */
          console.error('Error fetching user:', error);
        })
        .finally(() => setIsLoading(false));
    } else {
      setSelectedUser(null);
    }
  }, [selectedTodo]);

  const filteredTodos = useMemo(() => {
    let updatedTodos = todos;

    switch (status) {
      case 'all':
        updatedTodos = todos;
        break;
      case 'active':
        updatedTodos = todos.filter(todo => !todo.completed);
        break;
      case 'completed':
        updatedTodos = todos.filter(todo => todo.completed);
        break;
      default:
        break;
    }

    if (query) {
      updatedTodos = updatedTodos.filter(todo =>
        todo.title.toLowerCase().includes(query.toLowerCase()),
      );
    }

    return updatedTodos;
  }, [status, todos, query]);

  const handleModalClose = () => {
    setSelectedTodo(null);
    setSelectedTodoId(null);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                handleStatus={setStatus}
                handleQuery={setQuery}
                onClose={() => setQuery('')}
                query={query}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}
              <TodoList
                todos={filteredTodos}
                handleSelect={setSelectedTodo}
                handleModalClose={handleModalClose}
                selectedTodoId={selectedTodoId}
                setSelectedTodoId={setSelectedTodoId}
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
        />
      )}
    </>
  );
};
