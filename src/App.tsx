import React, { useCallback, useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { getAllTodos, getUser } from './api/api';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { Todo } from './components/types/Todo';
import { User } from './components/types/User';

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [user, setUser] = useState<User | null>(null);
  const [isError, setIsError] = useState('');

  async function todosFromAPI() {
    try {
      const result = await getAllTodos();

      setIsError('');
      setTodos(result);
    } catch (error) {
      setTodos([]);

      setIsError(`Erorr: ${error}. Fail to download data from sevrer`);
    }
  }

  async function userFromAPI() {
    try {
      const result = await getUser(selectedUserId);

      setIsError('');
      setUser(result);
    } catch (error) {
      setUser(null);
      setIsError(`Erorr: ${error}. Fail to download user from sevrer`);
    }
  }

  useEffect(() => {
    if (!selectedUserId) {
      return;
    }

    userFromAPI();
  }, [selectedUserId]);

  useEffect(() => {
    todosFromAPI();
  }, []);

  const randomizeList = useCallback(() => {
    const randomizeTodos = [...todos];
    // eslint-disable-next-line
    for (let i = randomizeTodos.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));

      [randomizeTodos[i], randomizeTodos[j]]
      = [randomizeTodos[j], randomizeTodos[i]];
    }

    setTodos(randomizeTodos);
  }, [todos]);

  return (
    <div className="App">
      <div className="App__sidebar">
        {<TodoList
          todos={todos}
          setSelectedUserId={setSelectedUserId}
          currentId={selectedUserId}
          onShuffle={randomizeList}
        /> || <p>Loading...</p>}
      </div>

      <div className="App__content">
        <div className="App__content-container">
          {selectedUserId ? (
            <CurrentUser clearId={setSelectedUserId} user={user} />
          ) : 'No user selected'}
          {isError && <p>{isError}</p>}
        </div>
      </div>
    </div>
  );
};

export default App;
