/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos, getUser } from './api';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[] | null>(null);
  const [currentTodos, setCurrentTodos] = useState<Todo[] | null>(null);
  const [selectTodo, setSelectTodo] = useState<Todo | null>(null);

  useEffect(() => {
    getTodos()
      .then(todosFromServer => todosFromServer
        .map(todo => ({
          ...todo,
          user: getUser(todo.userId),
        })))
      .then(todosFromServer => {
        setTodos([...todosFromServer]);
        setCurrentTodos([...todosFromServer]);
      });
  }, []);

  const todosSelect = (selectOption:string) => {
    let filtredTodos;

    switch (selectOption) {
      case 'active':
        filtredTodos = todos?.filter(todo => todo.completed === false);

        if (filtredTodos) {
          setCurrentTodos(filtredTodos);
        }

        break;

      case 'completed':
        filtredTodos = todos?.filter(todo => todo.completed === true);

        if (filtredTodos) {
          setCurrentTodos(filtredTodos);
        }

        break;

      case 'all':
        setCurrentTodos(todos);

        break;

      default:
        break;
    }
  };

  const todosInput = (query:string) => {
    const lowerQuery = query.toLowerCase();

    const filtredTodos = todos?.filter(todo => (
      todo.title.toLowerCase().includes(lowerQuery)
    ));

    if (filtredTodos) {
      setCurrentTodos(filtredTodos);
    }
  };

  const selectUsers = (todo: Todo | null) => {
    if (selectTodo?.id !== todo?.id) {
      setSelectTodo(todo);
    }
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>
            <div className="block">
              <TodoFilter
                todosSelect={todosSelect}
                todosInput={todosInput}
              />
            </div>
            <div className="block">
              {todos ? (
                <TodoList
                  todos={currentTodos}
                  selectUsers={selectUsers}
                />
              ) : (
                <Loader />
              )}
            </div>
          </div>
        </div>
      </div>
      {selectTodo && (
        <TodoModal
          todo={selectTodo}
          selectUsers={selectUsers}
        />
      )}
    </>
  );
};
