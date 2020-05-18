import React, { useState } from 'react';
import TodoList from './TodoList';
import TodoFilter from './TodoFilter';
import { getTodos, getUsers } from './api';
import { Todos } from './interfaces';


const App = () => {
  const [todos, setTodos] = useState<Todos[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const loadData = () => {
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

  const sortTitles = () => {
    setTodos([...todos]
      .sort((a, b) => a.title.localeCompare(b.title)));
  };

  const sortComplete = () => {
    setTodos([...todos]
      .sort((a, b) => +b.completed - +a.completed));
  };

  const sortNames = () => {
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
          <TodoFilter
            sortTitles={sortTitles}
            sortComplete={sortComplete}
            sortNames={sortNames}
          />
          <TodoList todos={todos} />
        </>
      )}
      {!isLoaded && (
        <button
          type="button"
          onClick={loadData}
        >
          Download all data
        </button>
      )}
    </div>
  );
};

export default App;
