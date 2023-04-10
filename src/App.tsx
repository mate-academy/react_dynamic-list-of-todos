/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
// import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState(():Todo[] => []);
  const [todoId, selectTodo] = useState(0);
  const [visibleTodos, getVisibleTodos] = useState(todos);

  const selectedTodo = todos.find(todo => todo.id === todoId);

  const loadData = (async () => {
    const todosFromServer = await getTodos();

    setTodos(todosFromServer);
  });

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                getVisibleTodos={(todosAfterFiltering:Todo[]) => getVisibleTodos(todosAfterFiltering)}
                todos={todos}
              />
            </div>

            <div className="block">
              {/* <Loader /> */}
              <TodoList
                todos={visibleTodos}
                selectedTodo={todoId}
                selectTodo={(id:number) => selectTodo(id)}
              />
            </div>
          </div>
        </div>
      </div>
      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          selectTodo={(id:number) => selectTodo(id)}
        />
      )}
    </>
  );
};
