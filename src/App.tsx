import React, { useState } from 'react';
import './App.css';
import { getTodos, getUsers } from './helpers/api';
import TodoList from './components/TodoList';
import TodoSort from './components/TodoSort';

const App = () => {
  const [todos, setTodos] = useState<Todos[]>([]);
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

  const sortListByTitle = () => {
    setTodos([...todos]
      .sort((a, b) => a.title.localeCompare(b.title)));
  };

  const sortListByStatus = () => {
    setTodos([...todos]
      .sort((a, b) => +b.completed - +a.completed));
  };

  const sortListByName = () => {
    setTodos([...todos]
      .sort((a, b) => {
        const result = (a.user && b.user)
          ? a.user.name.localeCompare(b.user.name)
          : -1;

        return result;
      }));
  };

  return (
    <div className="todo">
      {isLoaded && (
        <>
          <TodoSort
            sortListByTitle={sortListByTitle}
            sortListByStatus={sortListByStatus}
            sortListByName={sortListByName}
          />
          <TodoList todos={todos} />
        </>
      )}
      {!isLoaded && (
        <button
          type="button"
          onClick={loadAllTodos}
        >
          Load all todos
        </button>
      )}
    </div>
  );
};


export default App;
