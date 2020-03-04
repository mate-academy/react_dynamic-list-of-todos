import React, { FC, useState } from 'react';
import './App.css';

import { getTodos } from './api/getTodos';
import { getUsers } from './api/getUsers';

import { TodoList } from './components/TodoList';
import { PreparedTodo, UserType } from './utils/interfaces';

const App: FC<{}> = () => {
  const [todos, saveTodos] = useState<PreparedTodo[]>([]);
  const [visibleTodos, saveVisibleTodos] = useState<PreparedTodo[]>([...todos]);
  const [isLoading, setLoading] = useState(false);
  const [isLoaded, setLoaded] = useState(false);
  const [filterUsed, setFilterUsed] = useState(true);

  const loadTodos = async () => {
    setLoading(true);

    const [loadedTodos, loadedUsers] = await Promise.all(
      [getTodos(), getUsers()],
    )
      .finally(() => setLoaded(true));

    const preparedTodos = [...loadedTodos]
      .map((todo) => {
        const user = loadedUsers.find(person => person.id === todo.userId) as UserType;

        return {
          ...todo,
          user,
        };
      });

    saveTodos(preparedTodos);
    saveVisibleTodos(preparedTodos);
    setLoading(false);
  };

  const sortFilter = (option: string) => {
    if (filterUsed) {
      switch (option) {
        case 'id': saveVisibleTodos([...todos]
          .sort((a, b) => b.id - a.id));
          break;
        case 'completed': saveVisibleTodos([...todos]
          .sort(a => (a.completed ? -1 : 1)));
          break;
        case 'username': saveVisibleTodos([...todos]
          .sort((a, b) => (b.user.name.localeCompare(a.user.name))));
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
            className="button"
            disabled={isLoading}
            onClick={loadTodos}
          >
            {isLoading ? (<>Loading...</>) : (<>Load Todos</>)}
          </button>
        )
        : (
          <TodoList todos={visibleTodos} filter={sortFilter} />
        )}
    </div>
  );
};

export default App;
