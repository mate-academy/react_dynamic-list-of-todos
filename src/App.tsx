import React, { FC, useState } from 'react';
import './App.css';
import { makeTodoList } from './utilities/prepareTodos';
import { PreparedTodo } from './interfaces';
import { TodoList } from './components/TodoList/TodoList';
import { Button } from './components/Button/Button';

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

  return (
    <>
      <h1>Dynamic list of TODOs</h1>
      {
        isLoaded
          ? null
          : (
            <Button
              isLoading={isLoading}
              onClick={loadData}
            />
          )
      }
      {
        isLoaded
          ? <TodoList todos={todoList} />
          : null
      }

    </>
  );
};

export default App;
