import React, { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './components/API/api';

const App: React.FC = () => {
  const [
    selectedUserId,
    setSelectedUserId,
  ] = useState(0);

  const [currentTodos, setCurrentTodos] = useState<Todo[]>([]);

  async function todosGetter() {
    const result = await getTodos();

    setCurrentTodos(result);
  }

  useEffect(() => {
    todosGetter();
  }, [selectedUserId]);

  return (
    <div className="App">
      <div className="App__sidebar">
        <TodoList
          listOfTodos={currentTodos}
          callbackForUserSelect={setSelectedUserId}
        />
      </div>

      <div className="App__content">
        <div className="App__content-container">
          {selectedUserId ? (
            <CurrentUser
              userId={selectedUserId}
              clearUser={setSelectedUserId}
            />
          ) : 'No user selected'}
        </div>
      </div>
    </div>
  );
};

export default App;
