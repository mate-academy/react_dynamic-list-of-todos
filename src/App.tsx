/* eslint-disable max-len */
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos, getUser } from './api';
import { Todo } from './types/Todo';
// eslint-disable-next-line import/no-extraneous-dependencies
import debounce from 'lodash.debounce';

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [modifiedTodos, setModifiedTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [appliedQuery, setAppliedQuery] = useState('');
  const [modalId, setModalId] = useState<number | null>(null);
  const [loadingModal, setLoadingModal] = useState(false);
  const [modalUser, setModalUser] = useState<any>({});

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      getTodos()
        .then(setTodos)
        .finally(() => setLoading(false));
    }, 300);
  }, []);

  useEffect(() => {
    setModifiedTodos(todos);
  }, [todos]);

  const handleFilterChange = (filter: string) => {
    switch (filter) {
      case 'active':
        setModifiedTodos(todos.filter(todo => !todo.completed));
        break;
      case 'completed':
        setModifiedTodos(todos.filter(todo => todo.completed));
        break;
      default:
        setModifiedTodos(todos);
    }
  };

  //////////////input/////////////////

  const applyQuery = useCallback(debounce(setAppliedQuery, 300), []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;

    setQuery(inputValue);
    applyQuery(inputValue);
  };

  const handleClearSearch = () => {
    setQuery('');
    setAppliedQuery('');
  };

  const filteredPeople = useMemo(() => {
    return modifiedTodos.filter(todo =>
      todo.title.toLowerCase().includes(appliedQuery.toLowerCase()),
    );
  }, [appliedQuery, modifiedTodos]);

  /////////////////openModal////////////////

  const handleModalClick = (id: number) => {
    setModalId(id);
  };

  useEffect(() => {
    if (modalId !== null) {
      setLoadingModal(true);

      setTimeout(() => {
        getUser(modalId)
          .then(setModalUser)
          .finally(() => setLoadingModal(false));
      }, 300);
    }
  }, [modalId]);

  const handleCloseModal = () => {
    setModalId(null);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                handleInputChange={handleInputChange}
                query={query}
                onFilterChange={handleFilterChange}
                onClearSearch={handleClearSearch}
              />
            </div>

            {loading && <Loader />}

            {!loading && todos.length > 0 && (
              <div className="block">
                <TodoList
                  todos={filteredPeople}
                  handleModalClick={handleModalClick}
                />
              </div>
            )}

            {!loading && todos.length === 0 && <div className="block"></div>}
          </div>
        </div>
      </div>

      {modalId && (
        <TodoModal
          loadingModal={loadingModal}
          modalUser={modalUser}
          handleClose={handleCloseModal}
        />
      )}
    </>
  );
};

export default App;
