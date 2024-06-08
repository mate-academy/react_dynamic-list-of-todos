/* eslint-disable max-len */
import React, { ChangeEvent, useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { Loader } from './components/Loader';
import { SortParams, SortQuery } from './types/Sort';
import { Modal } from './types/Modal';

const defaultSortParams: SortParams = {
  search: '',
  query: SortQuery.ALL,
};

const defaultModalState: Modal = {
  isOpen: false,
  todo: undefined,
  userId: undefined,
};

export const App: React.FC = () => {
  const [sortParams, setSortParams] = useState<SortParams>(defaultSortParams);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<Modal>(defaultModalState);

  const filteredTodos = useMemo<Todo[]>(() => {
    return [...todos].filter(todo => {
      switch (sortParams.query) {
        case SortQuery.ACTIVE:
          return todo.completed ? false : true;

        case SortQuery.COMPLETED:
          return todo.completed ? true : false;

        default:
          return true;
      }
    });
  }, [sortParams.query, todos]);

  const sortedEndFilteredTodos = useMemo<Todo[]>(() => {
    const { search } = sortParams;

    if (search) {
      return filteredTodos.filter(todo =>
        todo.title.toLocaleLowerCase().includes(search.toLocaleLowerCase()),
      );
    } else {
      return filteredTodos;
    }
  }, [filteredTodos, sortParams]);

  const optionsStatus = useMemo(
    () => [
      {
        value: SortQuery.ALL,
        content: 'All',
      },
      {
        value: SortQuery.ACTIVE,
        content: 'Active',
      },
      {
        value: SortQuery.COMPLETED,
        content: 'Completed',
      },
    ],
    [],
  );

  const sortTodos = (query: SortQuery) => {
    setSortParams(prev => ({
      ...prev,
      query,
    }));
  };

  const searchHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSortParams(prev => ({ ...prev, search: e.target.value }));
  };

  const deleteSearch = () => {
    setSortParams(prev => ({
      ...prev,
      search: '',
    }));
  };

  const modalOpen = (todo: Todo) => {
    setIsModalOpen({ isOpen: true, todo, userId: todo.userId });
  };

  const modalClose = () => {
    setIsModalOpen(defaultModalState);
  };

  useEffect(() => {
    setLoading(true);

    getTodos()
      .then(setTodos)
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                sortParams={sortParams}
                onChange={searchHandler}
                sortTodos={sortTodos}
                optionsStatus={optionsStatus}
                deleteSearch={deleteSearch}
              />
            </div>

            <div className="block">
              {loading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={sortedEndFilteredTodos}
                  isModalOpen={isModalOpen.isOpen}
                  todoId={isModalOpen.todo?.id}
                  modalOpen={modalOpen}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {isModalOpen.isOpen && isModalOpen.userId && isModalOpen.todo && (
        <TodoModal
          modalClose={modalClose}
          userId={isModalOpen.userId}
          todo={isModalOpen.todo}
        />
      )}
    </>
  );
};
