/* eslint-disable max-len */
import React from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { useTodos } from './hooks/useTodos';
import { useModal } from './hooks/useModal';

export const App: React.FC = () => {
  const {
    todos,
    isLoading,
    selectedTodo,
    onSelectTodo,
    onChangeStatus,
    onSearchByTitle,
  } = useTodos();

  const { isOpen, onClose, onOpen } = useModal();

  const onModalOpen = (todo: Todo) => {
    onSelectTodo(todo);
    onOpen();
  };

  const onModalClose = () => {
    onSelectTodo(null);
    onClose();
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onChangeStatus={onChangeStatus}
                onSearch={onSearchByTitle}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  activeTodoId={selectedTodo?.id}
                  todos={todos}
                  onClick={onModalOpen}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && isOpen && (
        <TodoModal todo={selectedTodo} onClose={onModalClose} />
      )}
    </>
  );
};
