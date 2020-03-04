import React, { FC, useState } from 'react';
import { TodoList } from './TodoList/TodoList';
import { TodoProps, UserProps, UsersTodo } from './types';
import { getUsers, getTodos } from './api/api';

const App: FC = () => {
  const [todos, setTodos] = useState<UsersTodo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<UsersTodo[]>([...todos]);
  const [isLoading, setLoading] = useState(false);

  const loadTodos = async () => {
    setLoading(true);

    const [todosFromServer, users] = await Promise.all([getTodos(), getUsers()]);

    const preparedTodos = todosFromServer.map((todo: TodoProps) => {
      const user = users.find((person: UserProps) => person.id === todo.userId) as UserProps;

      return {
        ...todo,
        user,
      };
    });

    setTodos(preparedTodos);
    setLoading(false);
    setFilteredTodos(preparedTodos);
  };

  const filterTodo = (typeOfFilter: string) => {
    switch (typeOfFilter) {
      case 'byTitle':
        setFilteredTodos([...todos]
          .sort((a, b) => a.title.localeCompare(b.title)));
        break;
      case 'byName':
        setFilteredTodos([...todos]
          .sort((a, b) => a.user.name.localeCompare(b.user.name)));
        break;
      case 'byCompleted':
        setFilteredTodos([...todos]
          .sort((a, b) => b.completed.toString()
            .localeCompare(a.completed.toString())));
        break;
      default:
    }
  };

  return (
    <div>
      <h1>Dynamic list of todos</h1>
      <div>
        {!todos.length
          ? (
            <button type="button" onClick={loadTodos} disabled={isLoading}>
              {isLoading ? 'Loading...' : 'Press to LOAD'}
            </button>
          )
          : (
            <>
              <button
                type="button"
                onClick={() => filterTodo('byTitle')}
              >
                Sort by Title
              </button>
              <button
                type="button"
                onClick={() => filterTodo('byName')}
              >
                Sort by User
              </button>
              <button
                type="button"
                onClick={() => filterTodo('byCompleted')}
              >
                Sort by Completed
              </button>
            </>
          )}

      </div>
      <TodoList todos={filteredTodos} />
    </div>
  );
};

export default App;
