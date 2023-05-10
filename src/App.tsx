/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos, getUser } from './api';
import { TodoModal } from './components/TodoModal';
import { User } from './types/User';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [query, setQuery] = useState<string>('');

  useEffect(() => {
    setIsLoading(true);

    getTodos()
      .then((todo) => {
        setTodos(todo);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        throw new Error(error);
      });
  }, []);

  const handleTodoClick = (todo: Todo) => {
    setIsLoading(true);
    setSelectedTodo(todo);

    getUser(todo.userId)
      .then((user) => {
        setSelectedUser(user);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        throw new Error(error);
      });
  };

  const filteredTodos = () => {
    let filteredTodosArr = [...todos];

    if (filterStatus === 'completed') {
      filteredTodosArr = filteredTodosArr.filter((todo) => todo.completed);
    }

    if (filterStatus === 'active') {
      filteredTodosArr = filteredTodosArr.filter((todo) => !todo.completed);
    }

    if (query) {
      filteredTodosArr = filteredTodosArr.filter((todo) => (
        todo.title.toLowerCase().includes(query.toLowerCase())
      ));
    }

    return filteredTodosArr;
  };

  const handleModalClose = () => {
    setSelectedTodo(null);
  };

  const handleFilterSelect = (filter: string) => {
    setFilterStatus(filter);
  };

  const handleQueryChange = (queryStr: string) => {
    setQuery(queryStr);
  };

  const handleQueryReset = () => {
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
                selectedFilter={filterStatus}
                onFilterSelect={handleFilterSelect}
                onQueryChange={handleQueryChange}
                onQueryReset={handleQueryReset}
                query={query}
              />
            </div>

            <div className="block">
              {isLoading
                ? <Loader />
                : (
                  <TodoList
                    todos={filteredTodos()}
                    onTodoClick={handleTodoClick}
                    selectedTodo={selectedTodo}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          selectedUser={selectedUser}
          onClose={handleModalClose}
          isLoading={isLoading}
        />
      )}
    </>
  );
};
