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

// function filterTodos(todos: Todo[], filterParams: FilterParamsType) {
//   let todosCopy = [...todos];

//   if (filterParams.selectFilter === FilterParams.Active && !filterParams.query) {
//     todosCopy = todosCopy.filter((todoTask) => !todoTask.completed);
//   }

//   if (filterParams.selectFilter === FilterParams.Completed && !filterParams.query) {
//     todosCopy = todosCopy.filter((todoTask) => todoTask.completed);
//   }

//   // if (filterParams.selectFilter === FilterParams.All && !filterParams.query) {
//   //   todosCopy = getTodos().then();
//   // }

//   if (filterParams.query) {
//     todosCopy = todosCopy.filter(({ title }) => title.toLowerCase()
//       .includes(filterParams.query.toLowerCase()));
//   }

//   return todosCopy;
// }

export const App: React.FC = () => {
  const [todos, setTodos] = useState([] as Todo[]);

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

  const handleChangeFilterParam = (event: ChangeEvent<HTMLSelectElement>) => {
    setFilterParam((prev) => ({ ...prev, selectFilter: event.target.value }));
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterParam((prev) => ({ ...prev, query: event.target.value }));
  };

  const handleResetQuery = () => {
    setFilterParam((prev) => ({ ...prev, query: '' }));
  };

  const handleSelectUser = (id: number) => {
    setUserId(id);
  };

  const handleSelectTodo = (todoId: number) => {
    setSelectedTodo(todos.find(({ id }) => id === todoId) || null);
  };

  const handleHideModal = () => {
    setSelectedTodo(null);
    setUserId(0);
    setIsModalActive(false);
  };

  useEffect(() => {
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
                onFilterChange={handleChangeFilterParam}
                onSearch={handleSearch}
                onReset={handleResetQuery}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={todos}
                  selectedTodo={selectedTodo}
                  selectTodo={handleSelectTodo}
                  selectUser={handleSelectUser}
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
          onHide={handleHideModal}
        />
      )}
    </>
  );
};
