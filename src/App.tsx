import React, { useState, useEffect } from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { SelectUserIdContext } from './contexts/SelectUserIdContext';
import { getTodos } from './api/api';

const App: React.FC = () => {
  const [
    selectedUserId, setSelectedUserId,
  ] = useState(0);
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    getTodos()
      .then(items => setTodos(items));
  }, []);

  return (
    <SelectUserIdContext.Provider value={{ selectedUserId, setSelectedUserId }}>
      <div className="App">
        <div className="App__sidebar">
          <TodoList todos={todos} />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    </SelectUserIdContext.Provider>
  );
};

export default App;
