import React, { FC, useState } from 'react';
import { loadTodos, loadUsers } from './loadData';
import { TodoWithUser, User, Todo } from './types';
import { TodoList } from './TodoList/TodoList';
import './App.css';

const App: FC<{}> = () => {
  const [todos, setTodos] = useState<TodoWithUser[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFiltred, setIsFiltred] = useState<boolean>(false);

  const showTodos = () => {
    setIsLoading(true);
    setIsFiltred(false);
    Promise.all([
      loadTodos,
      loadUsers,
    ])
      .then(res => {
        const todoWithUser = res[0].map((todo: Todo) => {
          const user = res[1].find(
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
    setIsFiltred(true);
  };

  const handleSortByTitle = () => {
    setTodos([...todos].sort(
      (a, b) => a.title.localeCompare(b.title),
    ));
    setIsFiltred(true);
  };

  const handleSortByCompleted = () => {
    setTodos([...todos].sort(
      (a, b) => Number(a.completed) - Number(b.completed),
    ));
    setIsFiltred(true);
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
              onClick={showTodos}
              disabled={isLoading}
            >
              Load Todo
            </button>
          )
          : (
            <>
              {
                isFiltred
                  ? (
                    <button
                      className="button reset-filter"
                      type="button"
                      onClick={showTodos}
                    >
                      Reset filter
                    </button>
                  )
                  : null
              }
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
      {
        isLoading
          ? (
            <p className="loading-text">Loading...</p>
          )
          : null
      }
    </>
  );
};

export default App;
