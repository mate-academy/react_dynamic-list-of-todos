/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
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
  // const [todoWithUser, setTodoWithUser] = useState<Todo | null>(null);
  const [isTodosLoaded, setIsTodosLoaded] = useState(true);
  const [isUserLoaded, setisUserLoaded] = useState(true);
  const [todoId, setTodoId] = useState(0);
  const [searchField, setSearchField] = useState('');

  const getTodosFromServer = async () => {
    const response = await getTodos();

    setTodos(response);
    setIsTodosLoaded(false);
  };

  useEffect(() => {
    getTodosFromServer();
  }, []);

  const visibleTodos = todos.filter(todo => {
    return todo.title.toLowerCase().includes(searchField.toLowerCase());
  });

  const findTodo = (id: number) => {
    return todos.find(todo => todo.id === id) || todos[0];
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter searchField={searchField} setSearchField={setSearchField} />
            </div>

            <div className="block">
              {isTodosLoaded
                ? <Loader />
                : (
                  <TodoList
                    todos={visibleTodos}
                    setTodoId={setTodoId}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {todoId !== 0
      && (
        <TodoModal
          currentTodo={findTodo(todoId)}
          isUserLoaded={isUserLoaded}
          setisUserLoaded={setisUserLoaded}
        />
      )}
    </>
  );
};
