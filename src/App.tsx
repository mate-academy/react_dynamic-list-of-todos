/* eslint-disable max-len */
import React, { useMemo } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { useState, useEffect } from 'react';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos, getUser } from './api';
import { User } from './types/User';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);
  const [isModalLoading, setIsModalLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const visibleTodos = useMemo(() => {
    let resultingTodos = [...todos];

    if (statusFilter !== 'all') {
      if (statusFilter === 'completed') {
        resultingTodos = resultingTodos.filter(todo => {
          return todo.completed === true;
        });
      } else {
        resultingTodos = resultingTodos.filter(todo => {
          return todo.completed === false;
        });
      }
    }

    if (query) {
      resultingTodos = resultingTodos.filter(todo => {
        return todo.title.toLowerCase().includes(query.toLowerCase());
      });
    }

    return resultingTodos;
  }, [todos, query, statusFilter]);

  useEffect(() => {
    const loadListOfTodos = () => {
      getTodos()
        .then(dataFromAPI => {
          setTodos(dataFromAPI);
          setIsLoading(false);
        })
        .catch(err => {
          // eslint-disable-next-line no-console
          console.log(err);
          setError('Failed to load todos');
          setIsLoading(false);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };

    loadListOfTodos();
  }, []);

  useEffect(() => {
    if (selectedTodoId === null) {
      return;
    }

    const userSelectedToDo = todos.find(todo => todo.id === selectedTodoId);

    if (userSelectedToDo === undefined) {
      return;
    }

    setIsModalLoading(true);

    getUser(userSelectedToDo.userId)
      .then(user => {
        setSelectedUser(user);
        setIsModalLoading(false);
      })
      .catch(() => {
        setError('Error on loading user');
        setIsModalLoading(false);
      });
  }, [selectedTodoId]);

  const selectedTodo = todos.find(todo => todo.id === selectedTodoId);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                onQueryChange={setQuery}
                statusFilter={statusFilter}
                onStatusFilterChange={setStatusFilter}
              />
            </div>

            {isLoading && <Loader />}
            {error !== null && <p>{error}</p>}
            {!isLoading && error === null && (
              <TodoList
                todos={visibleTodos}
                onSelectedTodo={setSelectedTodoId}
                selectedTodoId={selectedTodoId}
              />
            )}
            {/* <div className="block">
              <Loader />
              <TodoList />
            </div> */}
          </div>
        </div>
      </div>

      <TodoModal
        selectedTodoId={selectedTodoId}
        isLoading={isModalLoading}
        onClose={() => {
          setSelectedTodoId(null);
          setSelectedUser(null);
        }}
        todo={selectedTodo}
        user={selectedUser}
      />
    </>
  );
};
