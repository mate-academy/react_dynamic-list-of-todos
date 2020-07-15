import React, { useState, FC } from 'react';
import { TodosWithUsers } from './interfaces';
import { TodoList } from './components/TodoList/TodoList';
import { getPreparedTodos } from './api';
import './App.css';

const App: FC = () => {
  const [todos, setTodos] = useState<TodosWithUsers[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [isLoaded, setLoaded] = useState(false);

  const handleLoading = async () => {
    setLoading(true);

    await getPreparedTodos().then(response => setTodos(response));

    setLoading(false);
    setLoaded(true);
  };

  const sortByName = () => {
    setTodos([...todos].sort((a, b) => a.title.localeCompare(b.title)));
  };

  const sortByCompletion = () => {
    setTodos([...todos].sort((a, b) => Number(a.completed) - Number(b.completed)));
  };

  const sortByUser = () => {
    setTodos([...todos].sort((a, b) => a.user.name.localeCompare(b.user.name)));
  };

  if (isLoading) {
    return (
      <h1 className="App__heading">
        Loading...
      </h1>
    );
  }

  return (
    <div className="App">
      <h1 className="App__heading">Dynamic list of TODOs</h1>
      {!isLoaded && (
        <div className="App__menu">
          <button type="button" className="App__menu-btn" onClick={handleLoading}>
            Load List of Todos
          </button>
        </div>
      )}
      {isLoaded && (
        <>
          <div className="App__menu">
            <button type="button" className="App__menu-btn" onClick={sortByName}>Sort by Title</button>
            <button type="button" className="App__menu-btn" onClick={sortByCompletion}>Sort by Completion</button>
            <button type="button" className="App__menu-btn" onClick={sortByUser}>Sort by User Name</button>
          </div>
          <TodoList todos={todos} />
        </>
      )}
    </div>
  );
};

export default App;
