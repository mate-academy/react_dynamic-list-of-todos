/* eslint-disable max-len */
import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTodoData, setSelectedTodoData] = useState<{
    userId: number | null;
    todo: Todo | null;
  }>({ userId: null, todo: null });
  const [todos, setTodos] = useState<Todo[] | null>(null);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                todos={todos}
                setTodos={setTodos}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}
              <TodoList
                setIsLoading={setIsLoading}
                setSelectedTodoData={setSelectedTodoData}
                todos={todos}
                setTodos={setTodos}
              />
            </div>
          </div>
        </div>
      </div>

      {selectedTodoData.userId && (
        <TodoModal
          selectedTodoData={selectedTodoData}
          setSelectedTodoData={setSelectedTodoData}
        />
      )}
    </>
  );
};
