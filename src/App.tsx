import React, { useState, FC } from 'react';
import { Todo, User } from './types';
import { loadUsers, loadTodos } from './api';
import { ListOfTodos } from './components/ListOfTodos';
import { SortingButtons } from './components/SortingButtons';
import { LoadingButtons } from './components/LoadingButtons';
import { Users } from './components/Users';

const App: FC<{}> = () => {
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [gotError, setGotError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [sortedTodos, setSortedTodos] = useState<Todo[]>([]);

  const loadData = async (): Promise<[User[], Todo[]]> => {
    const loadedData = await Promise.all([
      loadUsers(),
      loadTodos(),
    ]);

    return loadedData;
  };

  const onLoading = async (): Promise<void> => {
    setLoading(true);

    try {
      const [usersData, todosData] = await loadData();

      setUsers(usersData);
      setTodos(todosData);
      setSortedTodos(todosData);
      setLoading(false);
      setLoaded(true);
      setErrorMessage('');
      setGotError(false);
    } catch (error) {
      setGotError(true);
      setErrorMessage(error.message);
    }
  };

  const compareByTitle = (a: Todo, b: Todo) => (
    a.title.localeCompare(b.title)
  );

  const compareByCompleted = (a: Todo, b: Todo) => (
    (a.completed && !b.completed) ? -1 : 1
  );

  const compareByUser = (comparingUsers: User[]) => {
    return (a: Todo, b: Todo) => {
      const userA = comparingUsers
        .find((user) => (user.id === a.userId));
      const userB = comparingUsers
        .find((user) => (user.id === b.userId));

      if (userA && userB) {
        const nameA = userA.name;
        const nameB = userB.name;

        return nameA.localeCompare(nameB);
      }

      return 0;
    };
  };

  const onSortByTitle = (): void => {
    setSortedTodos([...todos].sort(compareByTitle));
  };

  const onSortByComplete = (): void => {
    setSortedTodos([...todos].sort(compareByCompleted));
  };

  const onSortByUser = (): void => {
    setSortedTodos([...todos].sort(compareByUser(users)));
  };

  return (
    <>
      <h1>Dynamic list of TODOs</h1>
      {
        (!loaded)
          ? (
            <LoadingButtons
              onLoading={onLoading}
              loading={loading}
              gotError={gotError}
              errorMessage={errorMessage}
            />
          ) : (
            <>
              <Users
                users={users}
              />
              <SortingButtons
                onSortByTitle={onSortByTitle}
                onSortByComplete={onSortByComplete}
                onSortByUser={onSortByUser}
                loading={loading}
              />
              <ListOfTodos
                sortedTodos={sortedTodos}
              />
            </>
          )
      }
    </>
  );
};

export default App;
