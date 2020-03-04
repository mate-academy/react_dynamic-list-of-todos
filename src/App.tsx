import React, { FC, useState } from 'react';
import { getTodos, getUsers } from './Api';
import { TodoList } from './components/TodoList/TodoList';

import './App.css';

const App: FC<{}> = () => {
  const [todos, setTodos] = useState<TodosWithUser>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isStarted, setStarted] = useState<boolean>(true);

  const loadData = () => {
    setLoading(true);

    Promise.all([getTodos(), getUsers()])
      .then(response => {
        const preparedTodos = response[0].map(todo => ({
          ...todo,
          user: response[1].find(person => todo.userId === person.id) as User,
        }));

        setTodos(preparedTodos);
        setLoading(false);
        setStarted(false);
      });
  };

  const sortByName = () => {
    setTodos([...todos].sort((a, b) => a.user.name.localeCompare(b.user.name)));
  };

  const sortByTitle = () => {
    setTodos([...todos].sort((a, b) => a.title.localeCompare(b.title)));
  };

  const sortByComplete = () => {
    setTodos([...todos].sort((a, b) => Number(a.completed) - Number(b.completed)));
  };

  return (
    <>
      {
        isStarted
          ? (
            <button
              type="button"
              className="button button-load"
              disabled={isLoading}
              onClick={loadData}
            >
              {isLoading ? 'Loading...' : 'Load'}
            </button>
          ) : (
            <TodoList
              todos={todos}
              sortByName={sortByName}
              sortByTitle={sortByTitle}
              sortByComplete={sortByComplete}
            />
          )
      }
    </>
  );
};

export default App;
