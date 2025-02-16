import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { debounce } from './utils';

type FilterParameters = 'all' | 'active' | 'completed';

export const App: React.FC = () => {
  const [allTodos, setAllTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [query, setQuery] = useState('');
  const [appliedQuery, setAppliedQuery] = useState('');
  const [filterParameters, setFilterParameters] =
    useState<FilterParameters>('all');

  const getAllTodos = () => {
    setIsLoading(true);
    getTodos()
      .then(setAllTodos)
      .finally(() => setIsLoading(false));
  };

  const applyQuery = debounce(setAppliedQuery, 300);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    applyQuery(event.target.value);
  };

  const clearSearchQuery = () => {
    setQuery('');
    applyQuery('');
  };

  const handleFilterQuery = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterParameters(event.target.value as FilterParameters);
  };

  const closeModal = () => {
    setSelectedTodo(null);
    setShowModal(false);
  };

  useEffect(() => {
    getAllTodos();
  }, []);

  const getVisibleTodos = () => {
    let filteredTodos = allTodos;

    if (filterParameters === 'active' || filterParameters === 'completed') {
      filteredTodos = filteredTodos.filter(({ completed }) =>
        filterParameters === 'active' ? !completed : completed,
      );
    }

    if (appliedQuery) {
      filteredTodos = filteredTodos.filter(({ title }) =>
        title.toLowerCase().includes(appliedQuery.toLowerCase()),
      );
    }

    return filteredTodos;
  };

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

      {showModal && selectedTodo && (
        <TodoModal todo={selectedTodo} closeModal={closeModal} />
      )}
    </>
  );
};
