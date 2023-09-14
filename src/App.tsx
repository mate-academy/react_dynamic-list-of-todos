/* eslint-disable max-len */
import React, { ChangeEvent, useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { FilterParams, TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[] | null>(null);

  const [filterParam, setFilterParam] = useState({
    selectFilter: 'all',
    query: '',
  });

  const [userId, setUserId] = useState(0);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>({} as Todo);

  const [isLoading, setIsLoading] = useState(true);
  const [isModalActive, setIsModalActive] = useState(false);

  useEffect(() => {
    getTodos().then(setTodos).finally(() => setIsLoading(false));
  }, []);

  const changeFilterParam = (event: ChangeEvent<HTMLSelectElement>) => {
    setFilterParam((prev) => ({ ...prev, selectFilter: event.target.value }));
  };

  const filterTodos = () => {
    if (filterParam.selectFilter === FilterParams.All) {
      getTodos().then(todo => {
        setTodos(todo.filter(({ title }) => title.toLowerCase().includes(filterParam.query.toLowerCase())));
      });
    }

    if (filterParam.selectFilter === FilterParams.Active) {
      getTodos().then(todo => {
        setTodos(todo.filter(({ completed, title }) => {
          return !completed
            && title.toLowerCase().includes(filterParam.query.toLowerCase());
        }));
      });
    }

    if (filterParam.selectFilter === FilterParams.Completed) {
      getTodos().then(todo => {
        setTodos(todo.filter(({ completed, title }) => {
          return completed
            && title.toLowerCase().includes(filterParam.query.toLowerCase());
        }));
      });
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterParam((prev) => ({ ...prev, query: event.target.value }));
  };

  const resetQuery = () => {
    setFilterParam((prev) => ({ ...prev, query: '' }));
  };

  const selectUser = (id: number) => {
    setUserId(id);
  };

  const selectTodo = (todoId: number) => {
    setSelectedTodo(todos?.find(({ id }) => id === todoId) || null);
  };

  const hideModal = () => {
    setSelectedTodo(null);
    setUserId(0);
    setIsModalActive(false);
  };

  useEffect(() => {
    filterTodos();
  }, [filterParam]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filterParam={filterParam}
                onFilterChange={changeFilterParam}
                onSearch={handleSearch}
                onReset={resetQuery}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={todos}
                  selectedTodo={selectedTodo}
                  selectTodo={selectTodo}
                  selectUser={selectUser}
                  setModal={setIsModalActive}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {isModalActive && (
        <TodoModal
          todo={selectedTodo}
          userId={userId}
          onHide={hideModal}
        />
      )}
    </>
  );
};
