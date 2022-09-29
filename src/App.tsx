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
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedTodoId, setSelectedTodoId] = useState(0);
  const selectedTodo = todos.find(todo => todo.id === selectedTodoId) || null;
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);

  useEffect(() => {
    getTodos().then((response) => {
      setTodos(response);
      setIsLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (todos.length) {
      setVisibleTodos(todos);
    }
  }, [todos.length]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter todos={todos} setVisibleTodos={setVisibleTodos} />
            </div>

            <div className="block">
              { isLoaded
                ? (
                  <TodoList
                    todos={visibleTodos}
                    selectedTodoId={selectedTodoId}
                    onSelectTodoId={setSelectedTodoId}
                  />
                )
                : <Loader />}
            </div>
          </div>
        </div>
      </div>
      {selectedTodoId !== 0
        && <TodoModal selectedTodo={selectedTodo} onSelectTodoId={setSelectedTodoId} />}
    </>
  );
};
