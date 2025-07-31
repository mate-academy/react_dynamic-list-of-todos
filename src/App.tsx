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
  // null in case they will not load.
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [originalTodos, setOriginalTodos] = useState<Todo[] | null>(null);
  const [visibleTodos, setVisibleTodos] = useState<Todo[] | null>(null);

  useEffect(() => {
    getTodos().then(todosFromServer => {
      setOriginalTodos(todosFromServer);
      setVisibleTodos(todosFromServer);
    });
  }, []);

  const onTodoSelected = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  const onCloseModal = () => {
    setSelectedTodo(null);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter todos={originalTodos} onSelected={setVisibleTodos} />
            </div>

            <div className="block">
              {originalTodos ? (
                <TodoList
                  listOfVisibleTodos={visibleTodos}
                  onTodoSelected={onTodoSelected}
                  currentTodoId={selectedTodo?.id}
                />
              ) : (
                <Loader />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todoUserId={selectedTodo.userId}
          currentTodo={selectedTodo}
          onCloseModal={onCloseModal}
        />
      )}
    </>
  );
};
