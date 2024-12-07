/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Todo } from './types/Todo';
import { User } from './types/User';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const API_TODOS_URL =
    'https://mate-academy.github.io/react_dynamic-list-of-todos/api/todos.json';
  const API_USERS_URL =
    'https://mate-academy.github.io/react_dynamic-list-of-todos/api/users.json';
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [status, setStatus] = useState<string>('all');
  const [targetTodo, setTargetTodo] = useState<Todo | null>(null);
  const [name, setName] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(API_TODOS_URL)
      .then(response => response.json())
      .then(_todos => {
        return _todos.filter((todo: Todo) => {
          const { title } = todo;
          const titleToLC = title.toLowerCase();
          const inputToLC = inputValue.toLowerCase();

          return titleToLC.includes(inputToLC);
        });
      })
      .then(_todos => {
        return _todos.filter((todo: Todo) => {
          const { completed } = todo;

          if (status === 'active') {
            return completed === false;
          }

          if (status === 'completed') {
            return completed === true;
          }

          return todo;
        });
      })
      .then(_todos => setTodos(_todos));
  }, [status, inputValue]);

  useEffect(() => {
    fetch(API_USERS_URL)
      .then(response => response.json())
      .then(_users => {
        return (
          _users.find((_user: User) => _user.id === targetTodo?.userId) || null
        );
      })
      .then(_user => {
        if (_user) {
          return fetch(
            `https://mate-academy.github.io/react_dynamic-list-of-todos/api/users/${_user.id}.json`,
          )
            .then(_u => _u.json())
            .then(_u => setName(_u.name));
        }

        throw new Error(`can't find a user`);
      })
      .catch(() => {});
  }, [targetTodo]);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                status={status}
                inputValue={inputValue}
                setStatus={setStatus}
                setInputValue={setInputValue}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={todos}
                  targetTodo={targetTodo}
                  setTargetTodo={setTargetTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {targetTodo && (
        <TodoModal
          id={targetTodo.id}
          title={targetTodo.title}
          completed={targetTodo.completed}
          name={name}
          setTargetTodo={setTargetTodo}
        />
      )}
    </>
  );
};
