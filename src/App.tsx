import React, { FC, useState } from 'react';
import './App.css';
import { Todo, User, PreparedTodos } from './interfaces';
import { getTodos, getUsers } from './api';
import { TodosList } from './components/TodosList';

const App: FC = () => {
  const [todos, setPreparedTodos] = useState<PreparedTodos[]>([]);
  const [isLoading, setLoading] = useState(false);

  const loadTodos = async () => {
    setLoading(true);

    const [todosFromServer, users] = await Promise.all([getTodos(), getUsers()]);

    const todosWithUsers = todosFromServer.map((todo: Todo) => {
      const user = users.find((person: User) => person.id === todo.userId) as User;

      return {
        ...todo,
        user,
      };
    });

    setPreparedTodos(todosWithUsers);
  };

  const sortByTitle = () => {
    setPreparedTodos([...todos]
      .sort((a, b) => a.title.localeCompare(b.title)));
  };

  const sortByName = () => {
    setPreparedTodos([...todos]
      .sort((a, b) => a.user.name.localeCompare(b.user.name)));
  };

  const sortByStatus = () => {
    setPreparedTodos([...todos]
      .sort((a, b) => Number(b.completed) - Number(a.completed)));
  };

  if (todos.length === 0) {
    return (
      <>
        <button
          type="button"
          onClick={loadTodos}
        >
          Load todos
        </button>
        {isLoading && (
          <p>Loading...</p>
        )}
      </>
    );
  }

  return (
    <>
      <h1>Dynamic list of TODOs</h1>
      <TodosList
        todos={todos}
        onSortTitle={sortByTitle}
        onSortName={sortByName}
        onSortStatus={sortByStatus}
      />
    </>
  );
};

export default App;
