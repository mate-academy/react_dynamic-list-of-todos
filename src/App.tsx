/* eslint-disable max-len */
import React, { ChangeEvent, useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { getTodos, getUser } from './api';
import { Todo } from './types/Todo';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { User } from './types/User';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [searchQuery, setQuery] = useState('');
  const [filteredTodos, setFilteredTodos] = useState(todos);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearchActive, setSearchActive] = useState(false);
  const [isLoadingUser, setIsLoadingUser] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    setSearchActive(true);
  };

  const selectTodo = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  const closePopUp = () => {
    setSelectedTodo(null);
  };

  const onClearInput = () => {
    setQuery('');
    setSearchActive(false);
  };

  const visibleTodos = filteredTodos.filter(todo => {
    const lowerTitle = todo.title.toLowerCase();
    const lowerQuery = searchQuery.toLowerCase().trim();

    return lowerTitle.includes(lowerQuery);
  });

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(data => {
        setTodos(data);
        setFilteredTodos(data);
      })
      .finally(() => {
        setIsLoading(false);
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

  const getSelectTodos = (event: ChangeEvent<HTMLSelectElement>) => {
    switch (event.target.value) {
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

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={searchQuery}
                handleInput={handleInput}
                isSearchActive={isSearchActive}
                getSelectTodos={getSelectTodos}
                onClearInput={onClearInput}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}
              <TodoList
                visibleTodos={visibleTodos}
                selectTodo={selectTodo}
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
