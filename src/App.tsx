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
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [clickedPostId, setClickedPostId] = useState(0);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .finally(() => setIsDataLoading(false));
  }, []);

  const getTodoById = (todoId: number) =>
    todos.find(todo => todo.id === todoId);

  const selectedTodo = getTodoById(clickedPostId);

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
              {isDataLoading && <Loader />}
              <TodoList todos={todos} setClickedPostId={setClickedPostId} />
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal todo={selectedTodo} setClickedPostId={setClickedPostId} />
      )}
    </>
  );
};
