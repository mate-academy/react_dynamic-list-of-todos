import React, { useState, useEffect } from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import * as todosApi from './Api/Api';
import { TodoListType } from './types/TodoListType';

const App: React.FC = () => {
  const [
    selectedUserId,
    setSelectedUserId,
  ] = useState(0);

  const [todoList, setList] = useState<TodoListType[]>([]);

  const totalData = async () => {
    const todoArray = await todosApi.prepairingData();

    setList([...todoArray]);
  };

  useEffect(() => {
    totalData();
  }, []);

  return (
    <div className="App">
      <div className="App__sidebar">
        <TodoList
          todoList={todoList}
          setSelectedUserId={setSelectedUserId}
        />
      </div>

      <div className="App__content">
        <div className="App__content-container">
          {selectedUserId ? (
            <CurrentUser
              idOfUser={selectedUserId}
              setSelectedUserId={setSelectedUserId}
            />
          ) : 'No user selected'}
        </div>
      </div>
    </div>
  );
};

export default App;
