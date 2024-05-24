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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [modalButton, setModalButton] = useState<boolean>(false);
  const [filterButton, setFilterButton] = useState<FilteringType>(
    FilteringType.all,
  );
  const [searchedText, setSearchedText] = useState<string>('');

  const filteredTodos = (
    filtrTodos: Todo[],
    text: string,
    filterStatus: FilteringType,
  ) => {
    let filterTodos = [...filtrTodos];

    switch (filterStatus) {
      case FilteringType.completed:
        filterTodos = filtrTodos.filter(todo => todo.completed);
        break;
      case FilteringType.active:
        filterTodos = filtrTodos.filter(todo => !todo.completed);
        break;
      default:
        break;
    }

    if (text) {
      return filterTodos.filter(todo =>
        todo.title.toLowerCase().includes(text.toLowerCase().trim()),
      );
    }

    return filterTodos;
  };

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(allTodos => setTodos(allTodos))
      .finally(() => setIsLoading(false));
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
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  modalState={value => setModalState(value)}
                  modalButton={value => setModalButton(value)}
                  todos={filteredTodos(todos, searchedText, filterButton)}
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
