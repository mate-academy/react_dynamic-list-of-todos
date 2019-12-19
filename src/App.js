import React, { useState } from 'react';
// eslint-disable-next-line import/named
import { getTodosAndUsers } from './api/Fetching';
import TodoList from './components/TodoList';

const App = () => {
  const [listOfTodos, saveTodos] = useState([]);
  const [loaded, setLoading] = useState(false);
  const [sort, setSort] = useState('id');
  const [error, setError] = useState(false);

  const loadTodos = async() => {
    setLoading(true);

    try {
      const [usersFromServer, todosFromServer] = await getTodosAndUsers();

      const todoList = todosFromServer.map(todo => ({
        ...todo,
        user: usersFromServer.find(user => user.id === todo.userId),
      }));

      saveTodos(todoList);
    } catch {
      setLoading(false);
      setError(true);
    }
  };

  const sorting = (value) => {
    if (sort === value) {
      saveTodos([...listOfTodos].reverse());

      return;
    }

    const todoListCopy = [...listOfTodos]
      .sort((a, b) => {
        const firstItem = a[value] || a.user[value];
        const secondItem = b[value] || b.user[value];

        return typeof firstItem === 'string'
          ? String(firstItem).localeCompare(String(secondItem))
          : firstItem - secondItem;
      });

    saveTodos(todoListCopy);

    setSort(value);
  };

  if (error) {
    return <p>Error</p>;
  }

  return (
    <div>
      {!listOfTodos.length ? (
        <>
          <button
            type="button"
            onClick={loadTodos}
            disabled={loaded}
          >
            {loaded ? 'Loading...' : 'Loaded'}
          </button>
        </>
      )
        : (
          <>
            <TodoList todoList={listOfTodos} onClick={sorting} />
          </>
        )
      }
    </div>
  );
};

export default App;
