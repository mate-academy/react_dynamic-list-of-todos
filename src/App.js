import React, { useState } from 'react';
import './App.scss';

import { Todo } from './components/Todo/Todo';

const App = () => {
  const [todos, setTodos] = useState([]);

  async function fetchTodos() {
    const TODOS_URL = 'https://mate.academy/students-api/todos';
    const USERS_URL = 'https://mate.academy/students-api/users';

    try {
      Promise.all(
        [
          (await fetch(TODOS_URL)).json(),
          (await fetch(USERS_URL)).json(),
        ],
      ).then((response) => {
        const todosFromServer = response[0].data;
        const usersFromServer = response[1].data;

        const preparedTodos = todosFromServer
          .map(todo => (
            {
              ...usersFromServer.find(
                user => user.id === todo.userId,
              ),
              ...todo,
            }
          )).filter(todo => (
            todo.title
            && (todo.completed || todo.completed === false)
            && todo.name
            && todo.username
            && todo.email
          ));

        setTodos(preparedTodos);
      });
    } catch {
      fetchTodos();
    }
  }

  return (
    <>
      <h1>Dynamic list of todos</h1>

      {!todos.length && (
        <button
          type="button"
          className="loadData"
          onClick={fetchTodos}
        >
          Load
        </button>
      )}

      <div className="todolist">
        {todos.map(todo => (
          <Todo
            {...todo}
            key={todo.id}
          />
        ))}
      </div>
    </>
  );
};

export default App;
