import React, { useState } from 'react';
import { Button } from './components/Button';
import './App.css';
import { TodosList } from './components/TodosList';
import { SortOptions } from './components/SortOptions';

const TODOS_URL = 'https://jsonplaceholder.typicode.com/todos';
const USERS_URL = 'https://jsonplaceholder.typicode.com/users';

const loadData = async (url: string) => {
  const response = await fetch(url);

  return response.json();
};

let initialPreparedTodos: CompleteTodo[] = [];

export const App = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [dataWasLoaded, setDataWasLoaded] = useState<boolean>(false);
  const [filteredTodos, setFilteredTodos] = useState<CompleteTodo[]>([]);
  const [order, setOrder] = useState<number>(1);
  const [sortOption, setSortOption] = useState<string>('title');

  const handleLoadButtonClick = async () => {
    setIsLoading(true);

    const [initialTodos, initialUsers] = await Promise.all([
      loadData(TODOS_URL),
      loadData(USERS_URL),
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
              return 1 * order;
            }

            return -1 * order;
          }));
        break;
      }

      case 'name': {
        setFilteredTodos(initialPreparedTodos
          .slice()
          .sort((todoA, todoB) => {
            if (todoA.user.name > todoB.user.name) {
              return 1 * order;
            }

            return -1 * order;
          }));
        break;
      }

      default: {
        setFilteredTodos(initialPreparedTodos);
      }
    }

    if (key === sortOption) {
      setOrder(order * -1);
    }

    setSortOption(key);
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
