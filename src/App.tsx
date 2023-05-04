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
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isInfoWindowOpen, setIsInfoWindowOpen] = useState<boolean>(false);
  const [selectedInfoWindowId, setSelectedInfoWindowId] = useState<number | null>(null);

  const handleWindowOpen = (id: number) => {
    setIsInfoWindowOpen(true);
    setSelectedInfoWindowId(id);
  };

  const handleWindowClose = () => {
    setIsInfoWindowOpen(false);
  };

  useEffect(() => {
    getTodos()
      .then(todosFromServer => {
        setTodos(todosFromServer);
        setIsLoading(false);
      });
  }, []);

  const openTodo = todos.find(todo => todo.id === selectedInfoWindowId);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={todos}
                  onWindowOpen={handleWindowOpen}
                  isInfoWindowOpen={isInfoWindowOpen}
                  selectedInfoWindowId={selectedInfoWindowId}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {isInfoWindowOpen && openTodo && (
        <TodoModal
          todo={openTodo}
          onWindowClose={handleWindowClose}
        />
      )}
    </>
  );
};
