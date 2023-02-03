/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos, selectTodo } from './api';

export const App: React.FC = () => {
  const [todo, setTodo] = useState<Todo>();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [appTodo, setAppTodo] = useState<Todo[]>([]);
  const [check, setCheck] = useState(false);
  const [selectedTodoId, setSelectedTodoId] = useState<number>(0);

  useEffect(() => {
    selectTodo(selectedTodoId);
  });

  useEffect(() => {
    getTodos().then(setTodos);
  }, []);

  useEffect(() => {
    setTodos(todos);
  }, [todos]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter onFilter={setAppTodo} />
            </div>

            <div className="block">
              {todos.length
                ? <TodoList appTodo={appTodo} setTodo={setTodo} onCheck={setCheck} onSelect={setSelectedTodoId} selected={selectedTodoId} />
                : <Loader />}
            </div>
          </div>
        </div>
      </div>

      {(todo && check) && (<TodoModal todo={todo} onCheck={setCheck} onSelect={setSelectedTodoId} />)}
    </>
  );
};
