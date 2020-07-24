import React, { useState } from 'react';
import './App.css';
import { TodoWithUser } from './interfaces';
import { fetchData } from './api';
import { TodosList } from './TodosList';
import { ListButton } from './ListButton';
import { ListSortButtons } from './ListSortButtons';

const App: React.FC = () => {
  const [todos, setTodos] = useState<TodoWithUser[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleButtonLoad = async () => {
    setIsLoading(true);

    await fetchData().then(data => {
      setTodos(data);
      setIsLoading(false);
      setIsLoaded(true);
    });
  };

  const handleSortByTitle = () => {
    setTodos(prev => [...prev].sort((a, b) => a.title.localeCompare(b.title)));
  };

  const handleSortByCompleted = () => {
    setTodos(prev => [...prev].sort((a, b) => Number(b.completed) - Number(a.completed)));
  };

  const handleSortByName = () => {
    setTodos(prev => [...prev].sort((a, b) => a.user.name.localeCompare(b.user.name)));
  };

  const showStateLoaded = () => {
    if (isLoading && !isLoaded) {
      return (
        <img
          className="App_loading"
          alt="rolling"
          src="https://s7.gifyu.com/images/rolling.gif"
        />
      );
    }

    if (!isLoading && isLoaded) {
      return (
        <>
          <ListSortButtons
            handleSortByTitle={handleSortByTitle}
            handleSortByName={handleSortByName}
            handleSortByCompleted={handleSortByCompleted}
          />
          <TodosList todos={todos} />
        </>
      );
    }

    return (
      <ListButton handleButtonLoad={handleButtonLoad} />
    );
  };

  return (
    <div className="App">
      {showStateLoaded()}
    </div>
  );
};

export default App;
