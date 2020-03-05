import React, { useState, FC } from 'react';
import './App.css';
import { getTodos } from './api/utils/getTodos';
import { getUsers } from './api/utils/getUsers';
import { TodoList } from './components/TodoList/TodoList';

export const App: FC = () => {
  const [isLoading, setIsLoadindg] = useState(false);
  const [preparedTodos, setPreparedTodos] = useState<PreparedTodo[]>([]);
  const [typeOfSort, setTypeOfSort] = useState('');

  const handleLoadButton = async () => {
    setIsLoadindg(true);
    const todos = await getTodos();
    const users = await getUsers();

    const addUserForTodos = () => todos.map(todo => ({
      ...todo,
      user: users.find(user => user.id === todo.userId) as User,
    }));

    setPreparedTodos(addUserForTodos());
  };

  const handleTypeOfSort = () => {
    switch (typeOfSort) {
      case 'title':
        return [...preparedTodos].sort((a, b) => a.title.localeCompare(b.title));
      case 'completed':
        return [...preparedTodos]
          .sort((todoA, todoB) => (Number(todoB.completed) - Number(todoA.completed)));
      case 'user':
        return [...preparedTodos].sort((a, b) => a.user.name.localeCompare(b.user.name));
      default:
        return preparedTodos;
    }
  };

  return (
    <>
      <h1>Dynamic list of TODOs</h1>
      {preparedTodos.length === 0
        ? (
          <button
            type="button"
            disabled={isLoading}
            onClick={handleLoadButton}
            className="button"
          >
            {isLoading ? (<>Loading...</>) : <>Load Todos</>}
          </button>
        )
        : (
          <>
            <button
              className="button"
              type="button"
              onClick={() => setTypeOfSort('title')}
            >
              sort by title
            </button>
            <button
              className="button"
              type="button"
              onClick={() => setTypeOfSort('completed')}
            >
              sort by status
            </button>
            <button
              className="button"
              type="button"
              onClick={() => setTypeOfSort('user')}
            >
              by user name
            </button>
            <TodoList todos={handleTypeOfSort()} />
          </>
        )}
    </>
  );
};
