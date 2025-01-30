/* eslint-disable max-len */
// #region import
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { getTodos, getUser } from './api';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import { Todo } from './types/Todo';
// #endregion import

export enum Filter {
  all = 'all',
  active = 'active',
  completed = 'completed',
}

export const filterLabels: { [key in Filter]: string } = {
  [Filter.all]: 'All',
  [Filter.active]: 'Active',
  [Filter.completed]: 'Completed',
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openTodoId, setOpenTodoId] = useState<number | null>(null);

  const [todosLoading, setTodosLoading] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);

  const [filterValue, setFilterValue] = useState<Filter>(Filter.all);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setTodosLoading(true);

    getTodos()
      .then(setTodos)
      .finally(() => setTodosLoading(false));
  }, []);

  useEffect(() => {
    if (!currentTodo || currentTodo.user) {
      return;
    }

    getUser(currentTodo.userId)
      .then(user => {
        setCurrentTodo(prevTodo => {
          if (prevTodo?.id === currentTodo.id) {
            return { ...prevTodo, user };
          }

          return prevTodo;
        });
      })
      .finally(() => setModalLoading(false));
  }, [currentTodo]);

  const handleOpenModal = (todo: Todo): void => {
    setOpenTodoId(todo.id);
    setModalLoading(true);
    setIsModalOpen(true);

    setCurrentTodo(todo);
  };

  const filteredAndSearchedTodos = useMemo(() => {
    return todos
      .filter(todo => {
        switch (filterValue) {
          case Filter.completed:
            return todo.completed;
          case Filter.active:
            return !todo.completed;
          case Filter.all:
          default:
            return true;
        }
      })
      .filter(todo => {
        return todo.title.toLowerCase().includes(searchTerm.toLowerCase());
      });
  }, [todos, filterValue, searchTerm]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleCloseModal = (): void => {
    setIsModalOpen(false);
    setCurrentTodo(null);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setFilterValue={setFilterValue}
                searchTerm={searchTerm}
                handleSearchChange={handleSearchChange}
                handleClearSearch={handleClearSearch}
              />
            </div>

            <div className="block">
              {todosLoading && <Loader />}
              <TodoList
                todos={filteredAndSearchedTodos}
                handleOpenModal={handleOpenModal}
                isModalOpen={isModalOpen}
                openTodoId={openTodoId}
              />
            </div>
          </div>
        </div>
      </div>

      <TodoModal
        currentTodo={currentTodo}
        isModalOpen={isModalOpen}
        modalLoading={modalLoading}
        handleCloseModal={handleCloseModal}
      />
    </>
  );
};
