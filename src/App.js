import React, { useState } from 'react';
import './App.css';

import getTodos from './api/GetTodos';
import getUsers from './api/GetUsers';

import TodoList from './components/TodoList';

function App() {
  const [todos, saveTodos] = useState([]);
  const [visibleTodos, saveVisibleTodos] = useState([...todos]);
  const [isLoading, setLoading] = useState(false);
  const [isLoaded, setLoaded] = useState(false);
  const [filterUsed, setFilterUsed] = useState(true);

  const loadTodos = async() => {
    setLoading(true);

    const loadedTodos = await getTodos();
    const loadedUsers = await getUsers()
      .finally(() => setLoaded(true));

    const TodosWithUsers = [...loadedTodos]
      .map((todo) => {
        const user = loadedUsers.find(person => person.id === todo.userId);

        return {
          ...todo, user,
        };
      });

    saveTodos(TodosWithUsers);
    saveVisibleTodos(TodosWithUsers);
    setLoading(false);
  };

  const filter = (type) => {
    if (filterUsed) {
      saveVisibleTodos([...todos].sort((a, b) => b[type] - a[type]));
      setFilterUsed(false);
    } else {
      saveVisibleTodos(visibleTodos.reverse());
      setFilterUsed(true);
    }
  };

  return (
    <div className="App">
      {!isLoaded
        ? (
          <button
            type="button"
            disabled={isLoading}
            onClick={loadTodos}
            className="button"
          >
            {isLoading ? (<>Loading...</>) : (<>Load Todos</>)}
          </button>
        )
        : (
          <>
            <TodoList todos={visibleTodos} filter={filter} />
          </>
        )
      }
    </div>
  );
}

export default App;
