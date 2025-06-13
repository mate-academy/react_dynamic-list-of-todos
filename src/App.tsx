/* eslint-disable max-len */
import React from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { TodoFilterProps } from './types/ToDoFilterProps';
import { useTodos } from './components/Hooks/useTodos';

export const App: React.FC<TodoFilterProps> = () => {
  const {
    todos,
    isLoading,
    selectedTodo,
    handleCloseModal,
    handleSelectTodo,
    query,
    selectedUser,
    setQuery,
    filterStatus,
    setFilterStatus,
    isLoadingUser,
  } = useTodos();

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <TodoFilter
              status={filterStatus}
              setStatus={setFilterStatus}
              query={query}
              setQuery={setQuery}
            />

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={todos}
                  onSelectTodo={handleSelectTodo}
                  onSelect={handleSelectTodo}
                  isModalOpen={!!selectedTodo}
                  setIsModalOpen={() => handleCloseModal()}
                  selectedTodoId={selectedTodo ? selectedTodo.id : null}
                  setSelectedTodoId={() => {}}
                />
              )}
            </div>
          </div>

          {selectedTodo && (
            <TodoModal
              isLoading={isLoadingUser}
              todo={selectedTodo}
              user={selectedUser}
              onClose={handleCloseModal}
            />
          )}
        </div>
      </div>
    </>
  );
};
