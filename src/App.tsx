import React, { useState } from 'react';
import { PreparedTodoInterface } from './interfaces';
import { getData } from './api';
import { TodoList } from './components/TodoList/TodoList';
import { Button } from './components/Button/Button';
import './App.css';

const App: React.FC = () => {
  const [todos, setTodos] = useState<PreparedTodoInterface[]>([]);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [listLoad, setListLoad] = useState<boolean>(false);

  const handleButtonLoad = async () => {
    setIsLoaded(true);
    setDisabled(true);

    await getData().then(data => setTodos(data));

    setListLoad(true);
  };

  const sortByTitle = () => {
    setTodos(prev => [...prev].sort((a, b) => a.title.localeCompare(b.title)));
  };

  const sortByStatus = () => {
    setTodos(prev => [...prev].sort((a, b) => Number(a.completed) - Number(b.completed)));
  };

  const sortByName = () => {
    setTodos(prev => [...prev].sort((a, b) => a.user.name.localeCompare(b.user.name)));
  };

  return (
    <div className="container">
      <Button
        isLoaded={isLoaded}
        listLoad={listLoad}
        disabled={disabled}
        sortByTitle={sortByTitle}
        sortByStatus={sortByStatus}
        sortByName={sortByName}
        handleButtonLoad={handleButtonLoad}
      />
      <TodoList todos={todos} />
    </div>
  );
};

export default App;
