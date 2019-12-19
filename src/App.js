import React, { useState } from 'react';
import './App.scss';

import { getTodosAndUsers } from './api';
import TodoList from './TodoList';

const App = () => {
  const [todos, saveTodos] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [sortField, setSortField] = useState('id');
  const [loadingError, setLoadingError] = useState(false);

  const loadTodos = async() => {
    setLoading(true);

    try {
      const [usersFromServer, todosFromServer] = await getTodosAndUsers();
      const newTodos = todosFromServer.map(todo => ({
        ...todo,
        user: usersFromServer.find(user => user.id === todo.userId),
      }));

      saveTodos(newTodos);
    } catch {
      setLoading(false);
      setLoadingError(true);
    }
  };

  const sortHandler = (field) => {
    if (sortField === field) {
      saveTodos([...todos].reverse());

      return;
    }

    const newTodos = [...todos]
      .sort((todoA, todoB) => {
        const comparator1 = todoA[field] || todoA.user[field];
        const comparator2 = todoB[field] || todoB.user[field];

        return typeof comparator1 === 'number'
          ? comparator1 - comparator2
          : String(comparator1).localeCompare(String(comparator2));
      });

    saveTodos(newTodos);

    setSortField(field);
  };

  if (loadingError) {
    return <p className="error-message">Oops, something went wrong!</p>;
  }

  return (
    <div className="App">
      {!todos.length ? (
        <>
          <button
            className="button button_load"
            type="button"
            onClick={loadTodos}
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Load'}
          </button>
        </>
      )
        : (
          <>
            <h1 className="table__heading">Dynamic list of todos</h1>
            <TodoList todoList={todos} handleClick={sortHandler} />
          </>
        )
      }
    </div>
  );
};

export default App;
