/* eslint-disable max-len */
import React, { useCallback, useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { debounce } from './utils';

export const App: React.FC = () => {
  const [allTodos, setAllTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const [query, setQuery] = useState('');
  const [appliedQuery, setAppliedQuery] = useState('');
  const [filterQuery, setFilterQuery] = useState('');

  const getAllTodos = () => {
    getTodos()
      .then(data => setAllTodos(data))
      .finally(() => setIsLoading(false));
  };

  const applyQuery = useCallback(debounce(setAppliedQuery, 300), []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    applyQuery(event.target.value);
  };

  const clearSearchQuery = () => {
    setQuery('');
    applyQuery('');
  };

  const handleFilterQuery = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterQuery(event.target.value);
  };

  const closeModal = () => {
    setSelectedTodo(null);
    setShowModal(false);
  };

  useEffect(() => {
    getAllTodos();
  }, []);

  const getVisibleTodos = useCallback(() => {
    let filteredTodos = [...allTodos];

    if (filterQuery === 'active' || filterQuery === 'completed') {
      filteredTodos = allTodos.filter(({ completed }) => {
        if (filterQuery === 'active') {
          return !completed;
        } else {
          return completed;
        }
      });
    }

    if (appliedQuery) {
      filteredTodos = filteredTodos.filter(({ title }) =>
        title.toLowerCase().includes(appliedQuery.toLowerCase()),
      );
    }

    return filteredTodos;
  }, [allTodos, filterQuery, appliedQuery]);

  const visibleTodos = getVisibleTodos();

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                handleChange={handleChange}
                query={query}
                clearQuery={clearSearchQuery}
                setFilterQuery={handleFilterQuery}
              />
            </div>

            {isLoading ? (
              <Loader />
            ) : (
              <div className="block">
                <TodoList
                  todos={visibleTodos}
                  selectTodo={setSelectedTodo}
                  selectedTodo={selectedTodo}
                  showModalWindow={setShowModal}
                  isShowModal={showModal}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {showModal && <TodoModal todo={selectedTodo} closeModal={closeModal} />}
    </>
  );
};
