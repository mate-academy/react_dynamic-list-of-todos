/* eslint-disable max-len */
import React, { ChangeEvent, useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter/TodoFilter';

import { Loader } from './components/Loader';
import { Todo } from './types/Todo';

import { getTodos, getUser } from './api';
import { TodoModal } from './components/TodoModal';
import { User } from './types/User';

enum StatusesSelect {
  Active = 'active',
  Completed = 'completed',
}

export const App: React.FC = () => {
  const [initialTodos, setInitialTodos] = useState<Todo[]>([]);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');

  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [statusSelect, setStatusSelect] = useState('All');

  const [loadingTodos, setLoadingTodos] = useState(false);
  const [loadingUser, setLoadingUser] = useState(false);

  const normalizeTodos = todos.filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()));

  useEffect(() => {
    setLoadingTodos(true);

    getTodos()
      .then(data => {
        setTodos(data);
        setInitialTodos(data);
      })
      .finally(() => {
        setLoadingTodos(false);
      });
  }, []);

  useEffect(() => {
    if (selectedTodo) {
      setLoadingUser(true);

      getUser(selectedTodo?.userId)
        .then(data => {
          setUser(data);
        })
        .finally(() => {
          setLoadingUser(false);
        });
    }
  }, [selectedTodo]);

  useEffect(() => {
    if (statusSelect === StatusesSelect.Active) {
      setTodos(initialTodos.filter(item => !item.completed));
    } else if (statusSelect === StatusesSelect.Completed) {
      setTodos(initialTodos.filter(item => item.completed));
    } else {
      setTodos(initialTodos);
    }
  }, [statusSelect, initialTodos]);

  const handlerSelectedTodo = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  const handlerGetStatusSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setStatusSelect(e.target.value);
  };

  const handlerCloseModal = () => {
    setSelectedTodo(null);
  };

  const handlerChangeQuery = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handlerReset = () => {
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
                query={query}
                onReset={handlerReset}
                onChangeQuery={handlerChangeQuery}
                onGetStatusSelect={handlerGetStatusSelect}
              />
            </div>

            <div className="block">
              {loadingTodos ? (
                <Loader />
              ) : (
                <TodoList
                  data={normalizeTodos}
                  onSelectedTodo={handlerSelectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          isLoading={loadingUser}
          user={user}
          selectedTodo={selectedTodo}
          onCloseModal={handlerCloseModal}
        />
      )}
    </>
  );
};
