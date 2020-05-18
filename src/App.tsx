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

  const sortingMethod = (sort: string) => {
    switch (sort) {
      case 'title':
        return setTodos([...todos]
          .sort((a, b) => a.title.localeCompare(b.title)));

      case 'completed':
        return setTodos([...todos]
          .sort((a, b) => +a.completed - +b.completed));

      case 'name':
        return setTodos([...todos]
          .sort((a, b) => {
            const result = (a.user && b.user)
              ? a.user.name.localeCompare(b.user.name)
              : -1;

            return result;
          }));

      default:
        return todos;
    }
  };

  return (
    <div className="todo">
      {isLoaded && (
        <>
          <TodoFilter
            sortingMethod={sortingMethod}
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
