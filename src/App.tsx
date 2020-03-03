import React, { useState } from 'react';
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
import './App.css';

export const App = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [dataWasLoaded, setDataWasLoaded] = useState<boolean>(false);
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

    switch (option) {
      case 'title':
      case 'completed': {
        setSortedTodos(prevTodos => {
          return prevTodos
            .slice()
            .sort((todoA, todoB) => {
              if (todoA[option] >= todoB[option]) {
                return 1;
              }

              return -1;
            });
        });

        break;
      }

      case 'name': {
        setSortedTodos(prevTodos => {
          return prevTodos
            .slice()
            .sort((todoA, todoB) => {
              if (todoA.user.name >= todoB.user.name) {
                return 1;
              }

              return -1;
            });
        });

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
      {dataWasLoaded ? <SortOptions onClick={handleSortButtonClick} /> : null}
      {dataWasLoaded ? <TodosList todos={sortedTodos} /> : null}
    </div>
  );
};

export default App;
