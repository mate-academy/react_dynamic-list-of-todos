import React, { FC, useState } from 'react';
import './App.css';
import { getData } from './components/getData/getData';
import { TodoList } from './components/TodoList';

const App: FC = () => {
  const [todos, setTodos] = useState<TodoWithUser[]>([]);
  const [isLoading, setIsLoading] = useState(false);


  const handleStart = async () => {
    setIsLoading(true);
    const todosFromServer = await getData();

    setTodos(todosFromServer);
    setIsLoading(false);
  };

  const filterForAll = (filterType: string) => {
    switch (filterType) {
      case 'title':
        setTodos([...todos]
          .sort((a, b) => a.title.localeCompare(b.title)));
        break;
      case 'name':
        setTodos([...todos]
          .sort((a, b) => a.user.name.localeCompare(b.user.name)));
        break;
      case 'completed':
        setTodos([...todos]
          .sort((a, b) => +a.completed - +b.completed));
        break;
      default:
    }
  };

  if (isLoading) {
    return (
      <div className="app">
        <p>Loading....</p>
      </div>
    );
  }

  if (!todos.length) {
    return (
      <div className="app">
        <button className="button is-info" type="button" onClick={handleStart}>Add</button>
      </div>
    );
  }

  return (
    <div className="app">
      <div className="buttons-box">
        <button
          className="button is-info"
          type="button"
          onClick={() => filterForAll('title')}
        >
          Filter Title
        </button>
        <button
          className="button is-info"
          type="button"
          onClick={() => filterForAll('name')}
        >
          Filter Name
        </button>
        <button
          className="button is-info"
          type="button"
          onClick={() => filterForAll('completed')}
        >
          Filter Completed
        </button>
      </div>
      <TodoList todos={todos} />
    </div>
  );
};

export default App;
