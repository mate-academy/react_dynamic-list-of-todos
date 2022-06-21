import React, { useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';

const App: React.FC = () => {
  const [
    selectedUserId,
    setSelectedUserId,
  ] = useState(0);

  // !!!! if we change user with condition , better write function
  // if without condition - we can pass setSelectesUserId

  // const selectUser = (userId) => {
  //   setSelectedUserId(userId);
  // };

  // !!!! option if we want to use async await

  // const getTodosFromServer = async () => {
  //   const todosFromServer = await getTodos();

  //   setTodos(todosFromServer);
  // };
  // useEffect(() => {
  //   getTodosFromServer();
  // }, [])

  return (
    <div className="App">
      <div className="App__sidebar">
        <TodoList
          selectUser={setSelectedUserId}
        />
      </div>

      <div className="App__content">
        <div className="App__content-container">
          {selectedUserId ? (
            <CurrentUser selectedUserId={selectedUserId} />
          ) : 'No user selected'}
        </div>
      </div>
    </div>
  );
};

export default App;
