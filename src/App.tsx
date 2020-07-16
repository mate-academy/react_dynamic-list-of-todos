import React, { useState, FC } from 'react';
import './App.css';
import { Todolist } from './TodoList';
import { loadTodos, loadUsers } from './api';

const App: FC = () => {
  const [todos, setTodos] = useState<TodoWithUser[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [sortedTodos, setsortedTodos] = useState<TodoWithUser[]>([...todos]);

  const isloaded = async () => {
    setLoading(true);

    const [todosFromServer, users] = await Promise.all(
      [loadTodos(), loadUsers()],
    );

    const preparedTodos = todosFromServer.map((todo: Todo) => {
      const user = users.find((person) => person.id === todo.userId) as User;

      return {
        ...todo,
        user,
      };
    });

    setTodos(preparedTodos);
    setLoading(false);
    setsortedTodos(preparedTodos);
  };

  const sort = (typeOfSort: string) => {
    switch (typeOfSort) {
      case 'sortByTitle':
        setsortedTodos([...todos].sort((a, b) => a.title.localeCompare(b.title)));
        break;
      case 'sortByCompleted':
        setsortedTodos([...todos].sort((a, b) => b.completed.toString()
          .localeCompare(a.completed.toString())));
        break;
      case 'sortByName':
        setsortedTodos([...todos].sort((a, b) => a.user.name.localeCompare(b.user.name)));
        break;

      default:
    }
  };

  if (!todos.length) {
    return (
      <div className="buttons">
        <button
          className="btn btn-primary"
          type="button"
          disabled={isLoading}
          onClick={isloaded}
        >
          {isLoading ? 'Loading...' : 'Load'}
        </button>
      </div>
    );
  }

  return (
    <div className="App">
      <h1 className="title">Dynamic list of TODOs</h1>
      <div className="buttons">
        <button
          className="btn btn-info buttons"
          type="button"
          onClick={() => sort('sortByTitle')}
        >
          Sort by title
        </button>
        <button
          className="btn btn-info buttons"
          type="button"
          onClick={() => sort('sortByCompleted')}
        >
          Sort by completed
        </button>
        <button
          className="btn btn-info buttons"
          type="button"
          onClick={() => sort('sortByName')}
        >
          Sort by name
        </button>

      </div>
      <Todolist todos={sortedTodos} />
    </div>
  );
};

export default App;
