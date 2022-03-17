import React, { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';

import { getTodos } from './api';

import { Todo } from './react-app-env';

const App: React.FC = () => {
  const [selectedUserId, setSelectUserId] = useState(0);
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    getTodos().then((todosFromAPI: Todo[]) => setTodos(todosFromAPI));
  }, []);

  const selectNewUser = (id: number) => {
    setSelectUserId(id);
  };

  return (
    <div className="App">
      <div className="App__sidebar">
        <TodoList todos={todos} selectId={selectNewUser} />
      </div>

      <div className="App__content">
        <div className="App__content-container">
          {selectedUserId ? (
            <CurrentUser userId={selectedUserId} />
          ) : 'No user selected'}
        </div>
      </div>
    </div>
  );
};

export default App;
