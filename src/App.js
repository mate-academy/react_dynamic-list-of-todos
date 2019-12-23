import React, { useState } from 'react';
import './App.css';

import getData from './api/getData';

import TodoList from './components/TodoList';

function App() {
  const todosURL = 'https://jsonplaceholder.typicode.com/todos';
  const usersURL = 'https://jsonplaceholder.typicode.com/users';

  const [todos, saveTodos] = useState([]);
  const [visibleTodos, saveVisibleTodos] = useState([...todos]);
  const [isLoading, setLoading] = useState(false);
  const [isLoaded, setLoaded] = useState(false);
  const [filterUsed, setFilterUsed] = useState(true);

  const loadTodos = async() => {
    setLoading(true);

    const [loadedTodos, loadedUsers] = await Promise.all(
      [getData(todosURL), getData(usersURL)]
    )
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
    console.log(type);
    console.log(filterUsed);

    if (filterUsed) {
      switch (type) {
        case 'id': saveVisibleTodos([...todos]
          .sort((a, b) => b.id - a.id));
          break;
        case 'completed': saveVisibleTodos([...todos]
          .sort(a => (a.completed ? -1 : 1)));
          break;
        case 'user.username': saveVisibleTodos([...todos]
          .sort((a, b) => b.user.username.localeCompare(a.user.username)));
          break;
        default: saveVisibleTodos([...todos]
          .sort((a, b) => b.title.localeCompare(a.title)));
      }
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
