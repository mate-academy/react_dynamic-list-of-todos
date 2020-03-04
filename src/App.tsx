import React, { FC, useState } from 'react';
import './App.css';
import { TodoList } from './components/TodoList/TodoList';
import { TodoType, UserType } from './types';
import { getUsers, getTodos } from './api';

const App: FC<{}> = () => {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [visibleTodos, setVisibleTodos] = useState<TodoType[]>([...todos]);

  const showTodos = async () => {
    setLoading(true);

    const [todosFromServer, users] = await Promise.all(
      [getTodos(), getUsers()],
    );

    const preparedTodos = todosFromServer.map((todo: TodoType) => {
      const user = users.find((person: UserType) => person.id === todo.userId) as UserType;

      return {
        ...todo,
        user,
      };
    });

    setTodos(preparedTodos);
    setLoading(false);
    setVisibleTodos(preparedTodos);
  };

  const filter = (typeOfFilter: string) => {
    switch (typeOfFilter) {
      case 'sortByTitle':
        setVisibleTodos([...todos]
          .sort((a, b) => a.title.localeCompare(b.title)));
        break;
      case 'sortByName':
        setVisibleTodos([...todos]
          .sort((a, b) => a.user.name.localeCompare(b.user.name)));
        break;
      case 'sortByCompleted':
        setVisibleTodos([...todos]
          .sort((a, b) => b.completed.toString()
            .localeCompare(a.completed.toString())));
        break;
      default:
    }
  };

  if (isLoading) {
    return (
      <p>Loading...</p>
    );
  }

  if (!todos.length) {
    return (
      <button type="button" onClick={showTodos}>Load todos</button>
    );
  }

  return (
    <div className="App">
      <h1>Static list of todos</h1>
      <button type="button" onClick={() => filter('sortByTitle')}>Sort by title</button>
      <button type="button" onClick={() => filter('sortByName')}>Sort by name</button>
      <button type="button" onClick={() => filter('sortByCompleted')}>Sort by completed</button>
      <TodoList todos={visibleTodos} />
    </div>
  );
};

export default App;
