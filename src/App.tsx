import React, { useState, useEffect } from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './components/api';
import { Todo } from './components/types';

const App: React.FC = () => {
  const [userId, setUserId] = useState(0);
  const [allTodos, setTodos] = useState<Todo[]>([]);
  const [todoID, setTodoID] = useState(0);

  useEffect(() => {
    getTodos('todos')
      .then(todos => {
        setTodos(todos);
      });
  }, []);

  return (
    <div className="App">
      <div className="App__sidebar">
        <TodoList
          todos={allTodos}
          selectId={(userID) => {
            setUserId(userID);
          }}
          todoId={(todoId) => {
            setTodoID(todoId);
          }}
          selectedtodoId={todoID}
        />
      </div>

      <div className="App__content">
        <div className="App__content-container">
          {userId !== 0 ? (
            <CurrentUser
              userId={userId}
              selectUser={(userID: number) => {
                setUserId(userID);
              }}
            />
          ) : 'No user selected'}
        </div>
      </div>
    </div>
  );
};

export default App;
