import React, { useState, FC } from 'react';
import './App.css';
import { TodoList } from './components/TodoList';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

const App: FC<{}> = () => {
  const [todos, setTodos] = useState([]);
  const [originalTodos, setOriginalTodos] = useState([]);
  const [isLoading, setLodaing] = useState(false);
  const [isLoaded, setLoaded] = useState(false);
  const [hasError, setError] = useState(false);

  const loadTodos = async () => {
    setLodaing(true);
    setError(false);

    try {
      const [todosResponse, usersResponse] = await Promise.all([
        fetch(`${BASE_URL}/todos`),
        fetch(`${BASE_URL}/users`),
      ]);

      const todoList = await todosResponse.json();
      const users = await usersResponse.json();
      const todosWithUsers = todoList.map((todo: Todo) => ({
        ...todo,
        user: users.find((user: User) => user.id === todo.userId),
      }));

      setTodos(todosWithUsers);
      setOriginalTodos(todosWithUsers);
      setLoaded(true);
    } catch (error) {
      setError(true);
    }

    setLodaing(false);
  };

  const sortByTitle = () => {
    setTodos([...originalTodos].sort((a: Todo, b: Todo) => a.title.localeCompare(b.title)));
  };

  const sortByUser = () => {
    setTodos([...originalTodos]
      .sort((a: TodoWithUser, b: TodoWithUser) => a.user.name.localeCompare(b.user.name)));
  };

  const sortByCompleted = () => {
    setTodos([...originalTodos].sort((a: Todo, b: Todo) => +(a.completed) - +(b.completed)));
  };

  return (
    <>
      {isLoaded ? (
        <TodoList
          todos={todos}
          sortByTitle={sortByTitle}
          sortByUser={sortByUser}
          sortByCompleted={sortByCompleted}
        />
      ) : (
        <div className="wrapper">
          {hasError && (
            <h2 className="error-title">Error loading data occured.</h2>
          )}
          <button
            type="button"
            onClick={loadTodos}
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Load todos'}
          </button>
        </div>
      )}
    </>
  );
};

export default App;
