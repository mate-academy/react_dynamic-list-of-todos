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
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | undefined>();
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    getTodos().then(data => setTodos(data));
  }, [todos]);

  const handleSelectBtn = (todo: Todo) => {
    setSelectedTodo(todo);
    setIsSelected(true);
  };

  const handleCross = () => {
    setSelectedTodo(undefined);
    setIsSelected(false);
  };

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
              {todos.length === 0 ? (
                <Loader />
              ) : (
                <TodoList
                  list={todos}
                  onSelect={handleSelectBtn}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {isSelected && (
        <TodoModal
          list={todos}
          onCross={handleCross}
        />
      )}

    </>
  );
};
