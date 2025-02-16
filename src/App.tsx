/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { Completed, Filters } from './types/Filters';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [modal, setModal] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [filtersParams, setFiltersParams] = useState<Filters>({
    completedType: Completed.All,
    searchByText: '',
  });

  const handleCloseModal = () => {
    setSelectedTodo(null);
  };

  const handleOpenModal = (todo: Todo) => {
    setSelectedTodo(todo);
    setModal(true);
  };

  const changeFilters = (key: keyof Filters, value: string | Completed) => {
    setFiltersParams(prevParams => {
      return {
        ...prevParams,
        [key]: value,
      };
    });
  };

  const filterTodos = useMemo(() => {
    let newTodos = [...todos];

    if (filtersParams.completedType) {
      newTodos = newTodos.filter(item => {
        switch (filtersParams.completedType) {
          case Completed.Active:
            return item.completed === false;
          case Completed.Completed:
            return item.completed;
          case Completed.All:
          default:
            return true;
        }
      });
    }

    if (filtersParams.searchByText) {
      newTodos = newTodos.filter(item => {
        return item.title
          .toLowerCase()
          .includes(filtersParams.searchByText.toLowerCase());
      });
    }

    return newTodos;
  }, [todos, filtersParams]);

  useEffect(() => {
    getTodos().then(setTodos);
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filtersParams={filtersParams}
                onSetParam={changeFilters}
              />
            </div>

            <div className="block">
              {todos.length === 0 ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filterTodos}
                  onTodo={handleOpenModal}
                  currTodo={selectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {modal && (
        <TodoModal
          onModal={setModal}
          todo={selectedTodo}
          closeTodo={handleCloseModal}
        />
      )}
    </>
  );
};
