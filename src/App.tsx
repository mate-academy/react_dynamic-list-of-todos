import React, { useState } from 'react';
import { getTodos, getUsers } from './helpers/api';
import TodoList from './components/TodoList';
import TodoSort from './components/TodoSort';
import './App.css';

const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const loadAllTodos = () => {
    const todosPromise = getTodos();
    const usersPromise = getUsers();

    Promise.all([todosPromise, usersPromise])
      .then(([todosFromServer, usersFromServer]) => {
        const preparedTodosList = todosFromServer.map(todo => {
          return {
            ...todo,
            user: usersFromServer.find(user => user.id === todo.userId),
          };
        });

        setIsLoaded(true);
        setTodos(preparedTodosList);
      });
  };

  const sortByTitle = () => {
    const sorterTodos = ([...todos]
      .sort((a, b) => a.title.localeCompare(b.title)));

    setTodos(sorterTodos);
  };

  const sortByStatus = () => {
    const sorterTodos = ([...todos]
      .sort((a, b) => +b.completed - +a.completed));

    setTodos(sorterTodos);
  };

  const sortByName = () => {
    const sorterTodos = ([...todos]
      .sort((a, b) => {
        const result = (a.user && b.user)
          ? a.user.name.localeCompare(b.user.name)
          : -1;

        return result;
      }));

    setTodos(sorterTodos);
  };

  return (
    <div className="todo">
      {isLoaded && (
        <>
          <TodoSort
            sortByTitle={sortByTitle}
            sortByStatus={sortByStatus}
            sortByName={sortByName}
          />
          <TodoList todos={todos} />
        </>
      )}
      {!isLoaded && (
        <button
          type="button"
          className="todo__start-btn"
          onClick={loadAllTodos}
        >
          Load all todos
        </button>
      )}
    </div>
  );
};

export default App;
