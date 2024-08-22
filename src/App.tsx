/* eslint-disable max-len */
import React, { useCallback, useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [initialTodos, setInitialTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    getTodos().then(todosList => {
      setTodos(todosList);
      setInitialTodos(todosList);
    });
  }, []);

  const handleEyeClick = useCallback(
    (selectedTodoId: number) => {
      setSelectedTodo(todos.find(todo => todo.id === selectedTodoId) || null);
    },
    [todos],
  );

  const handleFiltrationQueries = useCallback(
    (finishQuery = 'all', searchQuery = '') => {
      setTodos(
        initialTodos.filter(todo => {
          if (finishQuery === 'all') {
            return todo.title.toLowerCase().includes(searchQuery.toLowerCase());
          }

          return (
            todo.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
            todo.completed === (finishQuery === 'active' ? false : true)
          );
        }),
      );
    },
    [initialTodos],
  );

  const handleCancelSelection = useCallback(() => {
    setSelectedTodo(null);
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter handleFiltrationQueries={handleFiltrationQueries} />
            </div>

            <div className="block">
              {todos.length === 0 && <Loader />}
              <TodoList
                todos={todos}
                handleEyeClick={handleEyeClick}
                selectedTodoId={selectedTodo?.id ?? null}
              />
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          userTodo={selectedTodo}
          resetSelection={handleCancelSelection}
        />
      )}
    </>
  );
};
