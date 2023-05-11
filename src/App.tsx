/* eslint-disable max-len */
import React, { useState, useEffect, useMemo } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { getTodos } from './api';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorStatus, setErrorStatus] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedModalId, setSelectedModalId] = useState(0);
  const [sortingStatus, setSortingStatus] = useState('all');
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    getTodos()
      .then((data) => {
        setTodos(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setErrorStatus(error.message);
        setIsLoading(false);
      });
  }, []);

  const handleModalOpen = (id: number) => {
    setIsModalOpen(true);
    setSelectedModalId(id);
  };

  const handleSortingStatus = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortingStatus(event.target.value);
  };

  const getVisibleTodos = () => {
    let visibleTodos = [...todos];

    if (sortingStatus === 'active') {
      visibleTodos = visibleTodos.filter((todo) => !todo.completed);
    }

    if (sortingStatus === 'completed') {
      visibleTodos = visibleTodos.filter((todo) => todo.completed);
    }

    if (searchValue.length > 0) {
      visibleTodos = visibleTodos
        .filter((todo) => todo.title
          .toLowerCase()
          .includes(searchValue.toLowerCase().trim()));
    }

    return visibleTodos;
  };

  const visibleTodos = useMemo(getVisibleTodos, [todos, sortingStatus, searchValue]);
  const openModal = useMemo(() => {
    return todos.find((todo) => todo.id === selectedModalId);
  }, [todos, selectedModalId]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                sortingStatus={sortingStatus}
                onSelectChange={handleSortingStatus}
                setSearchValue={setSearchValue}
              />
            </div>

            {isLoading && (
              <div className="block">
                <Loader />
              </div>
            )}

            {errorStatus && !isLoading && (
              <p>There is nothing to show, please add todo</p>
            )}

            {!errorStatus && !isLoading && (
              <div className="block">
                <TodoList
                  todos={visibleTodos}
                  onModalOpen={handleModalOpen}
                  isModalOpen={isModalOpen}
                  selectedModalId={selectedModalId}
                />
              </div>
            )}

          </div>
        </div>
      </div>
      {isModalOpen && openModal && (
        <TodoModal
          todo={openModal}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};
