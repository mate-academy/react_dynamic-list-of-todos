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
import { User } from './types/User';

export const App: React.FC = React.memo(() => {
  const [todos, setTodos] = useState< {
    todos: Todo[]
    originalTodos: Todo[];
    searchQueryTodo: Todo[];
  }>({
    todos: [],
    originalTodos: [],
    searchQueryTodo: [],
  });
  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);
  const [user, setUser] = useState<{
    user: User;
    buttonClicked: boolean;
  }>({
    user: {
      id: 0,
      name: '',
      email: '',
      phone: '',
    },
    buttonClicked: false,
  });

  useEffect(() => {
    getTodos().then(result => {
      setTodos({
        todos: result,
        originalTodos: result,
        searchQueryTodo: result,
      });
    });
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter todos={todos} setTodos={setTodos} />
            </div>

            <div className="block">
              {todos.todos.length === 0 && <Loader />}
              <TodoList todos={todos.todos} setUser={setUser} setSelectedTodoId={setSelectedTodoId} />
            </div>
          </div>
        </div>
      </div>

      {user.buttonClicked === true
        && user.user.id !== 0
        ? <TodoModal user={user} todos={todos.todos} setUser={setUser} selectedTodoId={selectedTodoId} /> : ''}
    </>
  );
});
