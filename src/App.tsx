import React, { useState } from 'react';
import './App.scss';
import './styles/general.scss';
// import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
// import { getAllTodos } from './apis/api';

const App: React.FC = () => {
  const [
    selectedUser,
    // setSelectedUser,
  ] = useState(null);

  // const loadTodos = async () => {
  //   return (getAllTodos());
  // };

  return (
    <div className="App">
      <div className="App__sidebar">
        {/* <TodoList todos={loadTodos()} /> */}
      </div>

      <div className="App__content">
        <div className="App__content-container">
          {selectedUser ? (
            <CurrentUser user={selectedUser} />
          ) : 'No user selected'}
        </div>
      </div>
    </div>
  );
};

export default App;
