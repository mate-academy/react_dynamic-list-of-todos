/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const handleToggleTodo = (todo: Todo | null) => {
    setSelectedTodo(todo);
  };

  console.log('🚀 ~ todos:', todos);

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
              <TodoFilter />
            </div>

            <div className="block">
              {/* <Loader />  */}
              {todos.length === 0 ? (
                <Loader />
              ) : (
                <TodoList todos={todos} onTodoSelect={handleToggleTodo} />
              )}
            </div>
          </div>
        </div>
      </div>

      <TodoModal selectedTodo={selectedTodo} onModalClose={handleToggleTodo} />
    </>
  );
};
