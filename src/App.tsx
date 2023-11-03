/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [todoModalId, setTodoModalId] = useState(0);

  useEffect(() => {
    setIsLoading(true);

    getTodos()
      .then(todosList => {
        const todoFilter = todosList
          .filter(todo => todo.title
            .toLowerCase()
            .includes(query.trim().toLowerCase()))
          .filter(todo => {
            switch (selectedFilter) {
              case 'active':
                return !todo.completed;
              case 'completed':
                return todo.completed;
              default:
                return true;
            }
          });

        setTodos(todoFilter);
      })
      .finally(() => setIsLoading(false));
  }, [query, selectedFilter]);

  const handleShowModalClick = (todoId: number) => {
    setShowModal(true);
    setTodoModalId(todoId);
  };

  const handleHideModalClick = () => {
    setShowModal(false);
    setTodoModalId(0);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setSelectedFilter={setSelectedFilter}
                setQuery={setQuery}
                query={query}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={todos}
                  todoModalId={todoModalId}
                  handleShowModalClick={handleShowModalClick}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <TodoModal
          todos={todos}
          todoModalId={todoModalId}
          handleHideModalClick={handleHideModalClick}
        />
      )}
    </>
  );
};
