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

let initialPreparedTodos: CompleteTodo[] = [];

export const App = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [dataWasLoaded, setDataWasLoaded] = useState<boolean>(false);
  const [filteredTodos, setFilteredTodos] = useState<CompleteTodo[]>([]);

  const handleLoadButtonClick = async () => {
    setIsLoading(true);

    const [initialTodos, initialUsers] = await Promise.all([
      loadTodos(),
      loadUsers(),
    ]);

    initialPreparedTodos = initialTodos.map((todo: Todo) => {
      const user = initialUsers
        .find((currentUser: User) => currentUser.id === todo.userId);

      return {
        ...todo,
        user,
      };
    });

    setFilteredTodos(initialPreparedTodos);
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

  const handleSortButtonClick = (key: SortOption): void => {
    switch (key) {
      case 'title':
      case 'completed': {
        setFilteredTodos(initialPreparedTodos
          .slice()
          .sort((todoA, todoB) => {
            if (todoA[key] > todoB[key]) {
              return 1;
            }

            return -1;
          }));
        break;
      }

      case 'name': {
        setFilteredTodos(initialPreparedTodos
          .slice()
          .sort((todoA, todoB) => {
            if (todoA.user.name > todoB.user.name) {
              return 1;
            }

            return -1;
          }));
        break;
      }

      default: {
        setFilteredTodos(initialPreparedTodos);
      }
    }
  };

  return (
    <div>
      {renderLoadButton()}
      {dataWasLoaded ? <SortOptions onClick={handleSortButtonClick} /> : null}
      {dataWasLoaded ? <TodosList todos={filteredTodos} /> : null}
    </div>
  );
};

export default App;
