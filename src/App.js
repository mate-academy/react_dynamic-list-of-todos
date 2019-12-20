import React, { useState } from 'react';
import { getData } from './api/fetch';
import TodoList from './TodoList';
import './App.css';

const TODOS_URL = 'https://jsonplaceholder.typicode.com/todos';
const USERS_URL = 'https://jsonplaceholder.typicode.com/users';

const App = () => {
  const [combinedPosts, setCombinedPosts] = useState([]);
  const [isLoaded, setLoaded] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);

  const loadData = async() => {
    setLoading(true);

    try {
      const todosData = await getData(TODOS_URL);
      const usersData = await getData(USERS_URL);

      const allData = todosData.map(todo => ({
        ...todo,
        user: usersData.find(user => user.id === todo.userId),
      }));

      setCombinedPosts(allData);
      setLoading(false);
      setLoaded(true);
    } catch (e) {
      setLoading(false);
      setError(true);
    }
  };

  return (
    <div className="App">
      <h1>Dynamic list of todos</h1>

      {isLoaded ? (
        <TodoList list={combinedPosts} />
      ) : (
        <>
          <h2>{isError ? 'Error occured!!!' : 'No TodoList yet!'}</h2>

          <button
            className="load-btn"
            type="button"
            onClick={loadData}
          >
            {isLoading ? 'Loading...' : 'Load TodoList'}
          </button>
        </>
      )}
    </div>
  );
};

export default App;
