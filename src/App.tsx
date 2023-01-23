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
  const [selectedTodoId, setSelectedTodoId] = useState(0);
  const [preparedTodos, setPreparedTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingFailed, setIsLoadingFailed] = useState(false);

  const getTodosFromServer = async () => {
    setIsLoading(true);
    try {
      const todosFromServer = await getTodos();

      setIsLoading(false);
      setTodos(todosFromServer);
      setPreparedTodos(todosFromServer);
    } catch (error: unknown) {
      setIsLoadingFailed(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTodosFromServer();
  }, []);

  const selectTodo = (todoId: number) => {
    setSelectedTodoId(todoId);
  };

  const closeModal = () => {
    setSelectedTodoId(0);
  };

  const selectedTodo = todos.find(todo => todo.id === selectedTodoId) as Todo;

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                todos={todos}
                setPreparedTodos={setPreparedTodos}
              />
            </div>

            <div className="block">
              {isLoading && (
                <Loader />
              )}

              {isLoadingFailed && (
                <p>No todos were loaded!</p>
              )}

              {!isLoading && !isLoadingFailed && (
                <TodoList
                  selectTodo={selectTodo}
                  selectedTodoId={selectedTodoId}
                  todos={preparedTodos}
                />
              )}

            </div>
          </div>
        </div>
      </div>

      {selectedTodoId && (
        <TodoModal
          closeModal={closeModal}
          selectedTodo={selectedTodo}
        />
      )}
    </>
  );
};
