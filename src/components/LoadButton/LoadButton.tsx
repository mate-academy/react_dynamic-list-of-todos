import React, { FC, useState } from 'react';

import { getData } from '../../api';

interface Props {
  setTodos: (param: Todo[]) => void;
  setIsLoaded: (param: boolean) => void;
  setIsLoadingError: (param: boolean) => void;
}

export const LoadButton: FC<Props> = ({ setTodos, setIsLoaded, setIsLoadingError }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const load = async (): Promise<void> => {
    setIsLoadingError(false);
    setIsLoading(true);
    let users: User[] = [];
    let todos: Todo[] = [];

    try {
      users = await getData('https://mate.academy/students-api/users');
    } catch (_) {
      setIsLoadingError(true);
      setIsLoading(false);
    }

    try {
      todos = await getData('https://mate.academy/students-api/todos');
    } catch (_) {
      setIsLoadingError(true);
      setIsLoading(false);
    }

    if (users.length > 0 && todos.length > 0) {
      setTodos(todos.map((todo) => ({
        ...todo,
        user: users.find(user => user.id === todo.userId),
      })));
      setIsLoaded(true);
    }
  };

  return (
    <button
      type="button"
      disabled={isLoading}
      onClick={load}
    >
      {isLoading ? 'Loading...' : 'Load'}
    </button>
  );
};
