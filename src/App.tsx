import React, { useState, FC } from 'react';

import { Button } from './components/Button';
import { TodosList } from './components/TodosList';
import { SortOptions } from './components/SortOptions';

import { loadTodos } from './utils/todos';
import { loadUsers } from './utils/users';
import {
  CompleteTodo,
  Todo,
  User,
  SortOption,
} from './constants/types';
import { sortTodosByTitle, sortTodosByCompleteness, sortTodosByName } from './utils/helpers';
import './App.css';

export const App: FC = () => {
  const [isLoading, setLoading] = useState(false);
  const [isLoaded, setLoaded] = useState(false);
  const [sortedTodos, setSortedTodos] = useState<CompleteTodo[]>([]);
  const [sortOption, setSortOption] = useState<SortOption>(null);

  const handleLoadButtonClick = async () => {
    setIsLoading(true);

    const [initialTodos, initialUsers] = await Promise.all([
      loadTodos(),
      loadUsers(),
    ]);

    setSortedTodos(initialTodos.map((todo: Todo) => {
      const user = initialUsers
        .find((currentUser: User) => currentUser.id === todo.userId) as User;

      return {
        ...todo,
        user,
      };
    }));

    setDataWasLoaded(true);
    setIsLoading(false);
  };

  const renderLoadButton = (): JSX.Element | null => {
    if (dataWasLoaded) {
      return null;
    }

    if (isLoading) {
      return <Button text="Loading" disabled />;
    }

    return <Button text="Load" onClick={handleLoadButtonClick} />;
  };

  const handleSortButtonClick = (option: SortOption): void => {
    if (option === sortOption) {
      return;
    }

    let newSortedTodos: CompleteTodo[];

    switch (option) {
      case 'title': {
        newSortedTodos = sortTodosByTitle(sortedTodos);
        setSortedTodos(newSortedTodos);
        break;
      }

      case 'completed': {
        newSortedTodos = sortTodosByCompleteness(sortedTodos);
        setSortedTodos(newSortedTodos);
        break;
      }

      case 'name': {
        newSortedTodos = sortTodosByName(sortedTodos);
        setSortedTodos(newSortedTodos);
        break;
      }

      default: {
        setSortedTodos(sortedTodos);
      }
    }

    setSortOption(option);
  };

  return (
    <div>
      {renderLoadButton()}
      {dataWasLoaded && <SortOptions onClick={handleSortButtonClick} />}
      {dataWasLoaded && <TodosList todos={sortedTodos} />}
    </div>
  );
};

export default App;
