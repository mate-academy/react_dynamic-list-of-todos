import React, { useState } from 'react';
import { loadData } from '../../api/api';
import { TodoList } from '../TodoList';
import { TodoWithUserInterface } from '../../interfaces/TodoInterface';
import { UserInterface } from '../../interfaces/UserInterface';

export const TodoApp: React.FC = () => {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFetched, setIsFetched] = useState<boolean>(false);

  const load = async () => {
    setIsLoading(true);
    const usersFromServer = await loadData('users');
    const todosFromServer = await loadData('todos');

    setTodos(todosFromServer.map((todo: TodoWithUserInterface) => ({
      ...todo,
      user: usersFromServer.find((user: UserInterface) => user.id === todo.userId),
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
