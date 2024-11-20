/* eslint-disable max-len */
import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { useTodoContext } from './components/context/TodoContext';
import { useTodoModal } from './hooks/useTodoModal';
import { Filter } from './types/Filter';

export const App: React.FC = () => {
  const { originalTodos } = useTodoContext();
  const { todoModal, userModal, todoModalId, setTodoModalId, closeModal } =
    useTodoModal();

  const [filter, setFilter] = useState<Filter>('all');
  const [search, setSearch] = useState('');

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                selectedFilter={filter}
                onFilterChange={setFilter}
                searchValue={search}
                onSearchChange={setSearch}
              />
            </div>

            <div className="block">
              {originalTodos === null ? (
                <Loader />
              ) : (
                <TodoList
                  todos={originalTodos}
                  filter={filter}
                  search={search}
                  todoModalId={todoModalId}
                  onModalButtonClick={setTodoModalId}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {todoModalId && (
        <TodoModal
          todoModal={todoModal}
          userModal={userModal}
          onCloseButtonClick={closeModal}
        />
      )}
    </>
  );
};
