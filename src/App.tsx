/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos, getUser } from './api';

import { Todo } from './types/Todo';
import { User } from './types/User';
import { Filter } from './types/Filter';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalLoading, setIsModalLoading] = useState(false);

  const [filter, setFilter] = useState<Filter>('all');
  const [filterQuery, setFilterQuery] = useState<string>('');

  useEffect(() => {
    setIsLoading(true);

    getTodos()
      .then(todosData => {
        setTodos(todosData);
        setIsLoading(false);
      })
      .catch(error => {
        setIsLoading(false);
        throw new Error('Error fetching todos:', error);
      });
  }, []);

  const selectTodo = (todo: Todo) => {
    setSelectedTodo(todo);
    setIsModalLoading(true);

    getUser(todo.userId)
      .then(userData => {
        setSelectedUser(userData);
        setIsModalLoading(false);
      })
      .catch(error => {
        setIsModalLoading(false);
        throw new Error('Error fetching user:', error);
      });
  };

  const closeModal = () => {
    setSelectedTodo(null);
    setSelectedUser(null);
  };

  const changeFilter = (givenFilter: Filter) => {
    setFilter(givenFilter);
  };

  const changeFilterQuery = (query: string) => {
    setFilterQuery(query);
  };

  const resetFilters = () => {
    setFilter('all');
    setFilterQuery('');
  };

  const filterdTodos = todos.filter(todo => {
    if (filter === 'active' && todo.completed) {
      return false;
    }

    if (filter === 'completed' && !todo.completed) {
      return false;
    }

    if (
      filterQuery &&
      !todo.title.toLocaleLowerCase().includes(filterQuery.toLocaleLowerCase())
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
                filter={filter}
                changeFilter={changeFilter}
                filterQuery={filterQuery}
                changeFilterQuery={changeFilterQuery}
                resetFilters={resetFilters}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filterdTodos}
                  onSelectTodo={selectTodo}
                  selectedTodo={selectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          user={selectedUser}
          isLoading={isModalLoading}
          onClose={closeModal}
        />
      )}
    </>
  );
};
