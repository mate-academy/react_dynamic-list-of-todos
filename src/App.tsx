import React, { useState, FC } from 'react';
import './App.css';
import { Todolist } from './Todolist/Todolist';
import { getTodos, getUsers } from './api/api';

const App: FC = () => {
  const [todos, setTodos] = useState<TodoWithUser[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<TodoWithUser[]>([...todos]);
  const [isLoading, setLoading] = useState(false);


  const isloaded = async () => {
    setLoading(true);

    const [todosFromServer, users] = await Promise.all(
      [getTodos(), getUsers()],
    );

    const preparedTodos = todosFromServer.map((todo: Todo) => {
      const user = users
        .find(
          (person) => person.id === todo.userId,
        ) as User;

      return {
        ...todo,
        user,
      };
    });

    setTodos(preparedTodos);
    setLoading(false);
    setFilteredTodos(preparedTodos);
  };

  const filter = (typeOfFilter: string) => {
    switch (typeOfFilter) {
      case 'sortByTitle':
        setFilteredTodos([...todos]
          .sort((a, b) => a.title.localeCompare(b.title)));
        break;
      case 'sortByName':
        setFilteredTodos([...todos]
          .sort((a, b) => a.user.name.localeCompare(b.user.name)));
        break;
      case 'sortByCompleted':
        setFilteredTodos([...todos]
          .sort((a, b) => b.completed.toString()
            .localeCompare(a.completed.toString())));
        break;
      default:
    }
  };

  if (!todos.length) {
    return (
      <button
        className="start-button"
        type="button"
        onClick={isloaded}
        disabled={isLoading}
      >
        {isLoading ? 'Loading...' : 'Start Load'}
      </button>
    );
  }

  return (
    <div className="App">
      <h1 className="title">Static list of todos</h1>
      <div className="buttons">
        <button
          className="button"
          type="button"
          onClick={() => filter('sortByTitle')}
        >
          Sort by title
        </button>
        <button
          className=" button"
          type="button"
          onClick={() => filter('sortByName')}
        >
          Sort by name
        </button>
        <button
          className="button"
          type="button"
          onClick={() => filter('sortByCompleted')}
        >
          Sort by completed
        </button>
      </div>
      <Todolist todos={filteredTodos} />
    </div>
  );
};

export default App;
