/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { getTodos } from './api';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const [isDownloadComplete, setIsDownloadComplete] = useState(false);

  useEffect(() => {
    getTodos()
      .then(listOftodos => {
        setTodos(listOftodos);
        setVisibleTodos(listOftodos);
      })
      .then(() => setIsDownloadComplete(true));
  }, []);

  const handleUserSelect = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  const handleModalClose = () => {
    setSelectedTodo(null);
  };

  const getVisibleGoods = (filteredTodos: Todo[]) => {
    setVisibleTodos(filteredTodos);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                todos={todos}
                changeFilters={getVisibleGoods}
              />
            </div>

            <div className="block">
              {visibleTodos.length > 0 ? (
                <TodoList
                  todos={visibleTodos}
                  selectedTodo={selectedTodo}
                  onTodoSelect={handleUserSelect}
                />
              ) : (
                <>
                  {isDownloadComplete ? (
                    <>
                      <h1 className="is-vcentered">
                        No todos fulfilling your request
                      </h1>
                    </>
                  ) : (
                    <Loader />
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo !== null
        && (
          <TodoModal
            selectedTodo={selectedTodo}
            onClose={handleModalClose}
          />
        )}
    </>
  );
};
