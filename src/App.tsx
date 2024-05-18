/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { FilteringType, TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Todo } from './types/Todo';
import { Loader } from './components/Loader';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [modalState, setModalState] = useState<Todo | null>(null);
  const [loader, setLoader] = useState<boolean>(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [modalButton, setModalButton] = useState<boolean>(false);
  const [filterButton, setFilterButton] = useState<FilteringType>(
    FilteringType.all,
  );
  const [searchedText, setSearchedText] = useState<string>('');

  const filteredTodos = todos
    .filter(todo => {
      switch (filterButton) {
        case 'all':
          return todo;
        case 'completed':
          return todo.completed;
        case 'active':
          return !todo.completed;
        default:
          return todo;
      }
    })
    .filter(todo =>
      todo.title
        .toLowerCase()
        .trim()
        .includes(searchedText.toLowerCase().trim()),
    );

  useEffect(() => {
    setLoader(true);
    getTodos()
      .then(allTodos => setTodos(allTodos))
      .finally(() => setLoader(false));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                searchedText={searchedText}
                handleSearchedText={value => setSearchedText(value)}
                handleFilterButton={filter => setFilterButton(filter)}
              />
            </div>

            <div className="block">
              {loader ? (
                <Loader />
              ) : (
                <TodoList
                  modalState={value => setModalState(value)}
                  modalButton={value => setModalButton(value)}
                  todos={filteredTodos}
                  resultClick={modalButton}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <TodoModal
        modalState={modalState}
        modalButton={modalButton}
        handleClose={() => setModalButton(false)}
      />
    </>
  );
};
