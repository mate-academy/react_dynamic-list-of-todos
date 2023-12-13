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
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);

  const [loading, setLoading] = useState(true);

  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const handleCloseModal = () => {
    setSelectedTodo(null);
  };

  useEffect(() => {
    getTodos()
      .then(todos => {
        setVisibleTodos(todos);
      })
      .catch(error => {
        throw new Error('Error fetching todos', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                todosList={visibleTodos}
                onFilter={setVisibleTodos}
              />
            </div>

            <div className="block">
              {
                loading
                  ? (
                    <Loader />
                  )
                  : (
                    <TodoList
                      todos={visibleTodos}
                      onSelect={setSelectedTodo}
                      selectedTodo={selectedTodo}
                    />
                  )
              }
            </div>
          </div>
        </div>
      </div>
      {selectedTodo
        && (
          <TodoModal
            selectedTodo={selectedTodo}
            handleCloseModal={handleCloseModal}
          />
        )}
    </>
  );
};
