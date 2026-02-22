/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const [originalTodos, setOriginalTodos] = useState<Todo[]>([]);
  const [displayedTodos, setDisplayedTodos] = useState<Todo[]>([]);
  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);
  const [isLoadingTodos, setIsLoadingTodos] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    getTodos()
      .then(todos => {
        setOriginalTodos(todos);
        setDisplayedTodos(todos);
        setErrorMessage(null);
      })
      .catch(error =>
        setErrorMessage(`Failed to load todos. The error is ${error} `),
      )
      .finally(() => setIsLoadingTodos(false));
  }, []);

  function getTodoById(id: number): Todo | undefined {
    return originalTodos.find(todo => todo.id === id);
  }

  const handleCloseModal = () => {
    setSelectedTodoId(null);
  };

  const handleFilterChange = (todos: Todo[]) => setDisplayedTodos(todos);
  const handleSelectTodoId = (id: number | null) => setSelectedTodoId(id);

  const selectedTodo = selectedTodoId ? getTodoById(selectedTodoId) : null;

  if (errorMessage) {
    return <div className="notification is-danger">{errorMessage}</div>;
  }

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                todos={originalTodos}
                onFilterChange={handleFilterChange}
              />
            </div>

            <div className="block">
              {isLoadingTodos ? (
                <Loader />
              ) : (
                <TodoList
                  todos={displayedTodos}
                  selectedTodoId={selectedTodoId}
                  onSelectTodoId={handleSelectTodoId}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo !== null && selectedTodo !== undefined && (
        <TodoModal todo={selectedTodo} onClose={handleCloseModal} />
      )}
    </>
  );
};
