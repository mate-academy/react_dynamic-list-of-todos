import React, { useState } from 'react';
import './App.css';
import { TodoList } from './components/TodoList';
import LoadButton from './components/LoadButton';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [todosWithUsers, setTodosWithUsers] = useState<TodosWithUsers[]>([]);
  const [isStarted, setIsStarted] = useState<boolean>(false);

  const beforeLoaded = () => {
    setIsLoading(true);
    setIsStarted(true);
  };

  const afterLoaded = (list: TodosWithUsers[]) => {
    setTodosWithUsers(list);
    setIsLoading(false);
    setIsLoaded(true);
  };

  return (
    <div className="App">
      {!isStarted
        ? (
          <LoadButton
            beforeLoaded={beforeLoaded}
            afterLoaded={afterLoaded}
          />
        )
        : <></>}

      {
        isLoading
          ? <span className="button__text">Loading...</span>
          : <></>
      }
      {
        isLoaded
          ? <TodoList todos={todosWithUsers} />
          : <></>
      }
    </div>
  );
};
