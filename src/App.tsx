/* eslint-disable max-len */
import React, { ChangeEvent, useEffect, useState } from 'react';
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
  const [isLoadingTodos, setIsLoadingTodos] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isLoadingUser, setIsLoadingUser] = useState(false);
  const [query, setQuery] = useState('');
  const [filteredTodos, setFilteredTodos] = useState(todos);

  const selectTodo = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  const closePopUp = () => {
    setSelectedTodo(null);
  };

  const onTyping = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const clearQuery = () => {
    setQuery('');
  };

  const onSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    const filterType = event.target.value;

    switch (filterType) {
      case 'active':
        setFilteredTodos(todos.filter(todo => !todo.completed));
        break;
      case 'completed':
        setFilteredTodos(todos.filter(todo => todo.completed));
        break;
      default:
        setFilteredTodos(todos);
    }
  };

  const visibleTodos = filteredTodos
    .filter(todo => {
      const lowerTodo = todo.title.toLowerCase();
      const lowerQuery = query.toLowerCase().trim();

      return lowerTodo.includes(lowerQuery);
    });

  useEffect(() => {
    setIsLoadingTodos(true);
    getTodos()
      .then(data => {
        setTodos(data);
        setFilteredTodos(data);
      })
      .finally(() => {
        setIsLoadingTodos(false);
      });
  }, []);

  useEffect(() => {
    setIsLoadingUser(true);
    if (selectedTodo) {
      getUser(selectedTodo.userId)
        .then(user => {
          setSelectedUser(user);
        })
        .finally(() => {
          setIsLoadingUser(false);
        });
    }
  }, [selectedTodo]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                onTyping={onTyping}
                onSelect={onSelect}
                onClear={clearQuery}
              />
            </div>

            <div className="block">
              {isLoadingTodos && (
                <Loader />
              )}

              <TodoList
                todos={visibleTodos}
                selectTodo={selectTodo}
                selectedTodo={selectedTodo}
              />
            </div>
          </div>
        </div>
      </div>
      {selectedTodo && (
        <TodoModal
          selectedUser={selectedUser}
          selectedTodo={selectedTodo}
          isLoadingUser={isLoadingUser}
          onClosePopUp={closePopUp}
        />
      )}
    </>
  );
};
