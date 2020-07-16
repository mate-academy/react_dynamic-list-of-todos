import React, { FC, useState } from 'react';
import './App.css';
import { Todo, User, Sorting } from './Components/interfaces/interfaces';
import { loadData } from './Components/api/api';
import { URL_TODOS, URL_USERS, noUser } from './Components/constant/constants';
import { Button } from './Components/LoadButton/Button';
import { TodoList } from './Components/TodoList/TodoList';
import { FilterButtons } from './Components/FilterButtons/FilterButtons';

export const App: FC = () => {
  const [todosList, setTodoList] = useState<Todo[]>([]);
  const [isLoad, setLoad] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);

  const preparedTodos = (todos: Todo[], users: User[]) => {
    return todos.map(todo => ({
      ...todo,
      user: users.find(user => user.id === todo.userId) || noUser,
    }));
  };

  const onLoadData = async () => {
    setLoading(true);

    const todos = await loadData<Todo>(URL_TODOS);
    const users = await loadData<User>(URL_USERS);

    setTodoList(preparedTodos(todos, users));
    setLoad(true);
    setLoading(false);
  };

  const onFilterTodos = (sortingPattern: Sorting) => {
    setTodoList([...todosList].sort(sortingPattern));
  };

  return (
    <>
      <h1>Dynamic list of TODOs</h1>

      {!isLoad && (
        <Button
          title={isLoading ? 'Loading...' : 'Load'}
          onLoadData={onLoadData}
        />
      )}

      {isLoad && (
        <>
          <FilterButtons onFilterTodos={onFilterTodos} />
          <TodoList todosList={todosList} />
        </>
      )}
    </>
  );
};
