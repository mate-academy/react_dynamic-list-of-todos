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
  const [todo, setTodo] = useState<Todo | null>(null);

  useEffect(() => {
    getTodos().then(newTodos => setTodos(newTodos));
  }, []);

  const selectedTodo = (currentTodo: Todo | null) => {
    setTodo(currentTodo);
  };

  const selectedTodos = (currentTodos: Todo[]) => {
    setTodos(currentTodos);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onFilter={selectedTodos}
              />
            </div>

            <div className="block">
              {todos.length === 0 && <Loader />}
              <TodoList
                todos={todos}
                onSelect={selectedTodo}
              />
            </div>
          </div>
        </div>
      </div>

      {todo && (
        <TodoModal
          todo={todo}
          onSelect={selectedTodo}
        />
      )}
    </>
  );
};
