import React, { useState, FC } from 'react';
import { loadData } from '../../api/api';
import { TodoList } from '../TodoList';
import { TodoInterface } from '../../interfaces/TodoInterface';
import { UserInterface } from '../../interfaces/UserInterface';

export const TodoApp: FC = () => {
  const [todos, setTodos] = useState<TodoInterface[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFetched, setIsFetched] = useState<boolean>(false);

  const load = async () => {
    setIsLoading(true);
    const usersFromServer = await loadData<UserInterface>('users');
    const todosFromServer = await loadData<TodoInterface>('todos');

    setTodos(todosFromServer.map((todo) => ({
      ...todo,
      user: usersFromServer.find((user) => user.id === todo.userId),
    })));

    setIsLoading(false);
    setIsFetched(true);
  };

  if (!isFetched) {
    return (
      <div className="center-align">
        {
          !isLoading
            ? (
              <button
                type="button"
                className="btn btn-large"
                onClick={load}
              >
                Load
              </button>
            )
            : (
              <h5>Loading...</h5>
            )
        }
      </div>
    );
  }

  return <TodoList todos={todos} />;
};
