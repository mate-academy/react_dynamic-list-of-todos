import React, { useState } from 'react';
import cn from 'classnames';
import './App.css';
import { getTodos } from './api/utils/getTodos';
import { getUsers } from './api/utils/getUsers';
import { TodoList } from './components/TodoList/TodoList';

export const App = () => {
  const [isLoading, setIsLoadind] = useState<boolean>(false);
  const [preparedTodos, setpreparedTodos] = useState<PreparedTodo[]>([]);
  const [typeOfSort, settypeOfSort] = useState<string>('');
  const handleLoadButton = async () => {
    setIsLoadind(true);
    const todos = await getTodos();
    const users = await getUsers();

    const addUserForTodos = () => todos.map(todo => ({
      ...todo,
      user: users.find(user => user.id === todo.userId) as User,
    }));

    setpreparedTodos(addUserForTodos());
  };

  /*   handleFilter = (filter) => {
    this.setState({
      filter,
    });
  } */

  const handleTypeOfSort = () => {
    switch (typeOfSort) {
      case 'title':
        return [...preparedTodos].sort((a, b) => a.title.localeCompare(b.title));
      case 'completed':
        return [...preparedTodos]
          .sort((todoA, todoB) => (Number(todoB.completed) - Number(todoA.completed)));
      case 'user':
        return [...preparedTodos].sort((a, b) => a.user.name.localeCompare(b.user.name));
      default:
        return preparedTodos;
    }
  };

  /*   useEffect(() => {
    getTodos().then(setTodos);
    getUsers().then(setUsers);
  }, []); */

  /*   const addUserForTodos = () => todos.map(todo => ({
    ...todo,
    user: users.find(user => user.id === todo.userId),
  }));

  const preparedTodos = useMemo(() => {
    if (todos.length || users.length) {
      return addUserForTodos();
    }

    return [];
  }, [users, todos]); */

  /* console.log(preparedTodos); */

  return (
    <>
      <h1>Dynamic list of TODOs</h1>
      {!isLoading
        ? (
          <button
            type="button"
            disabled={isLoading}
            onClick={handleLoadButton}
            className="button"
          >
            {isLoading ? (<>Loading...</>) : <>Load Todos</>}
          </button>
        )
        : (
          <>
            <button
              className={cn({ selected: typeOfSort === 'title' })}
              type="button"
              onClick={() => settypeOfSort('title')}
            >
              sort by title
            </button>
            <button
              className={cn({ selected: typeOfSort === 'completed' })}
              type="button"
              onClick={() => settypeOfSort('completed')}
            >
              sort by status
            </button>
            <button
              className={cn({ selected: typeOfSort === 'user' })}
              type="button"
              onClick={() => settypeOfSort('user')}
            >
              by user name
            </button>
            <TodoList todos={handleTypeOfSort()} />
          </>
        )}
    </>
  );
};
