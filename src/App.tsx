import React, { FC, useState } from 'react';
import './App.css';
import { makeTodoList } from './utilities/prepareTodos';
import { PreparedTodo, SortCallback } from './interfaces';
import { TodoList } from './components/TodoList/TodoList';
import { Button } from './components/Button/Button';
import { FilterButtons } from './components/FilterButtons/FilterButtons';

const App: FC = () => {
  const [todoList, setTodoList] = useState<PreparedTodo[]>([]);
  const [isLoaded, setLoaded] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);

  const loadData = () => {
    setLoading(true);
    makeTodoList().then(todos => {
      setTodoList(todos);
      setLoaded(true);
      setLoading(false);
    });
  };

  const sortTodo = (callback: SortCallback) => {
    setTodoList(callback([...todoList]));
  };

  return (
    <>
      <h1>Dynamic list of TODOs</h1>
      {
        isLoaded
          ? (
            <>
              <FilterButtons sortTodos={sortTodo} />
              <TodoList todos={todoList} />
            </>
          )
          : (
            <Button
              content={isLoading ? 'Loading...' : 'Load'}
              onClick={loadData}
            />
          )
      }
    </>
  );
};

export default App;
