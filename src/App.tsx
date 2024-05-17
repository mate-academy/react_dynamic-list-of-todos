/* eslint-disable max-len */
import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { TodoFilterOptions, Todo } from './types/Todo';
import { useTodos } from './customHooks/useTodos';

export const App: React.FC = () => {
  const [toggleModal, setToggleModal] = useState<boolean>(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo>();
  const [todosFilter, setTodosFilter] = useState<TodoFilterOptions>({
    query: '',
    select: 'all',
  });
  const [todos, isLoaded] = useTodos(todosFilter);

  const handleFilterTodos = (filter: TodoFilterOptions): void => {
    setTodosFilter(filter);
  };

  const handleToggleModal = (toggle: boolean, seleceted?: Todo): void => {
    if (toggle == false) {
      setSelectedTodo(undefined);
    }

    setToggleModal(toggle);
    if (seleceted) {
      setSelectedTodo(seleceted);
    }
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                handleFilterTodos={handleFilterTodos}
                filterTodos={todosFilter}
              />
            </div>

            <div className="block">
              {isLoaded ? (
                <TodoList
                  todos={todos}
                  handleToggleModal={handleToggleModal}
                  selectedTodo={selectedTodo}
                />
              ) : (
                <Loader />
              )}
            </div>
          </div>
        </div>
      </div>
      {toggleModal && (
        <TodoModal
          selectedTodo={selectedTodo}
          handleToggleModal={handleToggleModal}
        />
      )}
    </>
  );
};
