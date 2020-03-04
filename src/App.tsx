import React, { FC, useState } from 'react';
import { loadTodos, loadUsers } from './loadData';
import { TodoWithUser, User, Todo } from './types';
import { TodoList } from './TodoList/TodoList';
import './App.css';

const App: FC = () => {
  const [todos, setTodos] = useState<TodoWithUser[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFiltered, setIsFiltered] = useState(false);

  const handleLoadTodos = () => {
    setIsLoading(true);
    setIsFiltered(false);

    Promise.all([
      loadTodos,
      loadUsers,
    ])
      .then(([todosFromApi, usersFromApi]) => {
        const todoWithUser = todosFromApi.map((todo: Todo) => {
          const user = usersFromApi.find(
            (person: User) => todo.userId === person.id,
          ) as User;

          return { ...todo, user };
        });

        setTodos(todoWithUser);
        setIsLoading(false);
      });
  };

  const handleSortByName = () => {
    setTodos([...todos].sort(
      (a, b) => a.user.name.localeCompare(b.user.name),
    ));
    setIsFiltered(true);
  };

  const handleSortByTitle = () => {
    setTodos([...todos].sort(
      (a, b) => a.title.localeCompare(b.title),
    ));
    setIsFiltered(true);
  };

  const handleSortByCompleted = () => {
    setTodos([...todos].sort(
      (a, b) => Number(a.completed) - Number(b.completed),
    ));
    setIsFiltered(true);
  };

  return (
    <>
      <h1>Dynamic list of TODOs</h1>
      {
        todos.length === 0
          ? (
            <button
              className="button"
              type="button"
              onClick={handleLoadTodos}
              disabled={isLoading}
            >
              Load Todo
            </button>
          )
          : (
            <>
              {isFiltered && (
                <button
                  className="button reset-filter"
                  type="button"
                  onClick={handleLoadTodos}
                >
                  Reset filter
                </button>
              )}
              <div className="app">
                <TodoList
                  todos={todos}
                  handleSortByName={handleSortByName}
                  handleSortByTitle={handleSortByTitle}
                  handleSortByCompleted={handleSortByCompleted}
                />
              </div>
            </>
          )
      }
      {isLoading && (
        <p className="loading-text">Loading...</p>
      )}
    </>
  );
};

export default App;
