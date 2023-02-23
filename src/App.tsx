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
  const [allTodos, setAllTodos] = useState<Todo[]>([]);
  const [todoId, setTodoId] = useState(0);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);

  useEffect(() => {
    getTodos().then(setAllTodos);
    getTodos().then(setVisibleTodos);
  }, []);

  const selectedTodo = visibleTodos.find(todo => todo.id === todoId) || null;

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                allTodos={allTodos}
                onSetTodos={(todos: Todo[]) => setVisibleTodos(todos)}
              />
            </div>

            <div className="block">
              {allTodos.length === 0 ? (
                <Loader />
              ) : (
                <TodoList
                  todos={visibleTodos}
                  selectedTodoId={todoId}
                  selectTodo={(id: number) => setTodoId(id)}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {todoId !== 0
        && (
          <TodoModal
            selectedTodo={selectedTodo}
            selectTodo={(id: number) => setTodoId(id)}
          />
        )}
    </>
  );
};
