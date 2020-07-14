import React, { useState, useMemo } from 'react';
import './App.css';
import { TodoItem } from './components/TodoItem';
import LoadingButtons from './components/LoadingButtons';
import SortButtons from './components/SortButtons';
import { getUsers, getTodos, Todo } from './helpers/api';

const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [typeOfSort, setTypeOfSort] = useState('');

  const handleLoadClick = async () => {
    setIsLoading(true);

    try {
      const todosFromServer = await getTodos();
      const usersFromServer = await getUsers();

      const todosWithUsers = todosFromServer.map(todo => ({
        ...todo,
        user: usersFromServer.find(user => user.id === todo.userId),
      }));

      setTodos(todosWithUsers);
    } catch (error) {
      setErrorMessage('Errors happens, try to reload');
    }

    setIsLoading(false);
  };

  const getVisibleTodos = (sortType: string) => {
    switch (sortType) {
      case 'title':
        return [...todos].sort((a, b) => a.title.localeCompare(b.title));

      case 'id':
        return [...todos].sort((a, b) => a.id - b.id);

      case 'user':
        return [...todos].sort((a, b) => {
          return a.user && b.user
            ? a.user?.name.localeCompare(b.user.name)
            : 0;
        });

      default:
        return [...todos];
    }
  };

  const visibleTodos = useMemo(() => getVisibleTodos(typeOfSort), [typeOfSort, todos]);

  return (
    <div className="app">
      <h1>Dynamic list of TODOs</h1>

      <LoadingButtons
        todos={todos}
        isLoading={isLoading}
        handleLoadClick={handleLoadClick}
        errorMessage={errorMessage}
      />

      <SortButtons
        todos={todos}
        setTypeOfSort={setTypeOfSort}
      />

      <ul className="cards__list">
        {visibleTodos.map(todo => (
          <li key={todo.id}>
            <TodoItem todo={todo} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
