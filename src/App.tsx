/* eslint-disable max-len */
import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [openModalId, setOpenModalId] = useState<number | null>(null);

  function handleOpenModal(todo: Todo) {
    setSelectedTodo(todo);
    setOpenModalId(todo.id);
  }

  function handleCloseModal() {
    setOpenModalId(null);
  }

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filter={filter}
                query={query}
                setFilter={setFilter}
                setQuery={setQuery}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}
              <TodoList
                todos={todos}
                filter={filter}
                query={query}
                openModalId={openModalId}
                setIsLoading={setIsLoading}
                setTodos={setTodos}
                handleOpenModal={handleOpenModal}
              />
            </div>
          </div>
        </div>
      </div>

      {openModalId !== null && selectedTodo && (
        <TodoModal
          openModalId={openModalId}
          todo={selectedTodo}
          handleCloseModal={handleCloseModal}
        />
      )}
    </>
  );
};
