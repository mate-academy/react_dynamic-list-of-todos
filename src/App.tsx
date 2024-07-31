/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleTodoSelect = (todo: Todo) => {
    setShowModal(true);
    setSelectedTodo(todo);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedTodo(null);
  };

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then(setTodos)
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter setFilteredTodos={setFilteredTodos} todos={todos} />
            </div>

            {loading ? (
              <Loader />
            ) : (
              <div className="block">
                <TodoList
                  todos={filteredTodos}
                  onTodoSelect={handleTodoSelect}
                  showModal={showModal}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal todo={selectedTodo} onClose={handleCloseModal} />
      )}
    </>
  );
};
