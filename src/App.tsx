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
  const [todoSelected, setTodoSelected] = useState<Todo | undefined>(undefined);

  useEffect(() => {
    getTodos().then(setTodos);
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter todos={todos} onSelected={setTodos} />
            </div>

            <div className="block">
              {todos.length < 1 && <Loader />}
              <TodoList
                todos={todos}
                selectedTodo={todoSelected}
                onSelected={setTodoSelected}
              />
            </div>
          </div>
        </div>
      </div>

      {todoSelected !== undefined && (
        <TodoModal todo={todoSelected} onDelete={setTodoSelected} />
      )}
    </>
  );
};
