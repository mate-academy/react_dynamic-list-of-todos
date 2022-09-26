/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { getTodos } from './api';

import { Todo } from './types/Todo';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoId, setTodoId] = useState(0);
  const [status, setStatus] = useState('');
  const [input, setInput] = useState('');

  useEffect(() => {
    getTodos()
      .then(setTodos);
  }, []);

  const visibleTodos = todos.filter(todo => {
    switch (status) {
      case 'active':
        return !todo.completed;

      case 'completed':
        return todo.completed;

      default:
        return todo;
    }
  }).filter(todo => todo.title.includes(input.toLowerCase()));

  const handleTodoId = (todoId: number) => {
    setTodoId(todoId);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                status={status}
                setStatus={setStatus}
                input={input}
                setInput={setInput}
              />
            </div>

            <div className="block">
              {!todos.length ? (
                <Loader />
              ) : (
                <TodoList
                  todos={visibleTodos}
                  selectedTodoId={todoId}
                  selectTodo={handleTodoId}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {todoId !== 0
        && (
          <TodoModal
            todos={visibleTodos}
            selectedTodoId={todoId}
            selectTodo={handleTodoId}
          />
        )}
    </>
  );
};
